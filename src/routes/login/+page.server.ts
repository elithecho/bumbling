import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/db';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required')
});

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
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

    const user = await prisma.user.findUnique({
      where: { email: email as string }
    });

    if (!user || !user.passwordHash) {
      return fail(400, {
        error: 'Invalid email or password'
      });
    }

    const isValid = await Bun.password.verify(
      password as string,
      user.passwordHash
    );

    if (!isValid) {
      return fail(400, {
        error: 'Invalid email or password'
      });
    }

    // Set session cookie
    cookies.set('session', user.id, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    throw redirect(303, '/');
  }
} satisfies Actions;
