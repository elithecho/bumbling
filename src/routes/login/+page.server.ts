import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/db';
import { RefillingTokenBucket, Throttler } from '$lib/server/rate-limit';
import { createSession, setSessionCookie } from '$lib/server/session';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required')
});

const ipBucket = new RefillingTokenBucket<string>(20, 1);
const loginThrottler = new Throttler<string>([1, 5, 30, 60, 300]); // Increasing timeouts: 1s, 5s, 30s, 1min, 5min

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session?.id && locals.user?.id) {
    return redirect(303, '/');
  }
  return {};
};

export const actions = {
  default: async (event) => {
    const clientIP = event.request.headers.get('X-Forwarded-For');
    if (clientIP !== null && !ipBucket.check(clientIP, 1)) {
      return fail(429, {
        error: 'Too many requests'
      });
    }

    const data = await event.request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return fail(400, {
        error: 'Email and password are required'
      });
    }

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return fail(400, {
          error: err.errors[0]
        });
      }
      return fail(400, {
        error: 'Invalid email or password format'
      });
    }

    if (clientIP !== null && !ipBucket.consume(clientIP, 1)) {
      return fail(429, {
        error: 'Too many requests'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email as string }
    });

    if (!user || !user.passwordHash) {
      if (email) loginThrottler.consume(email as string);
      return fail(400, {
        error: 'Invalid email or password'
      });
    }

    const isValid = await Bun.password.verify(
      password as string,
      user.passwordHash
    );

    if (!isValid) {
      loginThrottler.consume(email as string);
      return fail(400, {
        error: 'Invalid email or password'
      });
    }

    // Reset throttling on successful login
    loginThrottler.reset(email as string);

    // Create session and set cookie
    const session = await createSession(user.id);
    setSessionCookie(event, session.id, session.expiresAt);

    throw redirect(303, '/');
  }
} satisfies Actions;
