import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { ValidationError } from 'yup';
import prisma from '$lib/server/db';
import { createSession, setSessionCookie } from '$lib/server/session';


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

import { setupSchema, extractErrors } from '$lib/server/validations/setupValidation';

export const actions = {
  default: async (event) => {
    const { request } = event;
    const data = await request.formData();
    const orgName = data.get('orgName');
    const centerName = data.get('centerName');
    const centerAddress = data.get('centerAddress');
    const adminEmail = data.get('adminEmail');
    const adminName = data.get('adminName');
    const adminPassword = data.get('adminPassword');

    // Validate the input
    try {
      await setupSchema.validate(
        {
          orgName,
          centerName,
          centerAddress,
          adminEmail,
          adminName,
          adminPassword
        },
        { abortEarly: false }
      );
    } catch (err) {
      return fail(400, {
        errors: extractErrors(err as ValidationError),
        data: { orgName, centerName, centerAddress, adminEmail, adminName }
      });
    }

    try {
      // Hash the password using Bun's native functionality
      const passwordHash = await Bun.password.hash(adminPassword as string, {
        algorithm: "bcrypt",
        cost: 4, // number between 4-31
      });


      // Create organization
      const organization = await prisma.organization.create({
        data: {
          name: orgName as string
        }
      });

      // Create center
      await prisma.center.create({
        data: {
          name: centerName as string,
          address: centerAddress as string || null
        }
      });

      // Create super admin user
      const user = await prisma.user.create({
        data: {
          email: adminEmail as string,
          name: adminName as string,
          passwordHash,
          role: 'SUPER_ADMIN'
        }
      });

      // Create session and set cookie for auto-login
      const session = await createSession(user.id);
      setSessionCookie(event, session.id, session.expiresAt);

      throw redirect(303, '/');

    } catch (error) {
      console.error('Setup error:', error);
      return fail(500, {
        error: 'Failed to complete setup'
      });
    }
  }
} satisfies Actions;
