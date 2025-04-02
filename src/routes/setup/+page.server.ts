import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/db';
import { createSession, setSessionCookie } from '$lib/server/session';
import { ZodError } from 'zod';
import zodErrorSchema from '$lib/utils/zodErrorSchema';
import { passHash, passVerify } from '$lib/utils/password';

export const load: PageServerLoad = async () => {
  const organization = await prisma.organization.findFirst();
  const superAdmin = await prisma.user.findFirst({
    where: { role: 'SUPER_ADMIN' }
  });

  if (organization && superAdmin) {
    throw redirect(303, '/login');
  }

  return {
    needsSetup: !organization || !superAdmin
  };
};

import setupSchema from '$lib/server/validations/setupValidation';

export const actions = {
  default: async (event) => {
    const { request } = event;
    const formData = await request.formData();

    const orgName = formData.get('orgName') as string;
    const centerName = formData.get('centerName') as string;
    const centerAddress = formData.get('centerAddress') as string | null;
    const adminEmail = formData.get('adminEmail') as string;
    const adminName = formData.get('adminName') as string;
    const adminPassword = formData.get('adminPassword') as string;

    const data = {
      orgName,
      centerName,
      centerAddress,
      adminEmail,
      adminName,
      adminPassword,
    };

    try {
      await setupSchema.parseAsync(data);
      const passwordHash = await passHash(adminPassword);

      // Create organization
      const organization = await prisma.organization.create({
        data: {
          name: orgName,
        },
      });

      // Create center
      await prisma.center.create({
        data: {
          name: centerName,
          address: centerAddress || null,
        },
      });

      // Create super admin user
      const user = await prisma.user.create({
        data: {
          email: adminEmail,
          name: adminName,
          passwordHash,
          role: 'SUPER_ADMIN',
        },
      });

      // Create session and set cookie for auto-login
      const session = await createSession(user.id);
      setSessionCookie(event, session.id, session.expiresAt);

      throw redirect(303, '/');
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = zodErrorSchema(err);
        return fail(400, {
          error: true,
          alert: 'Please check the form for errors.',
          errors: formattedErrors,
          data,
        });
      }

      console.error('Setup error:', err);
      return fail(500, {
        error: true,
        alert: 'Failed to complete setup.',
        errors: {},
        data,
      });
    }
  },
} satisfies Actions;
