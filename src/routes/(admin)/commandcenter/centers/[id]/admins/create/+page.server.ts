import { z, ZodError } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import zodErrorSchema from '$lib/utils/zodErrorSchema';
import { getCenterById } from '$lib/server/collections/centerQueries';
import prisma from '$lib/server/db';
import { Role, Prisma } from '@prisma/client';
import { passHash } from '$lib/utils/password';

export const load: PageServerLoad = async ({ params }) => {
  const center = await getCenterById(params.id);

  if (!center) {
    throw redirect(303, '/commandcenter/centers');
  }

  return { center };
};

const adminSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const actions: Actions = {
  create: async ({ request, params }) => {
    const formData = Object.fromEntries(await request.formData());

    try {
      const adminData = await adminSchema.parseAsync(formData);
      const passwordHash = await passHash(adminData.password);

      const userData = {
          name: adminData.name,
          email: adminData.email,
          role: Role.ADMIN,
          passwordHash
      }

      // Create center admin relationship
      const user = await prisma.user.create({
        data: {
          ...userData,
          centers: {
            create: {
              centerId: params.id
            }
          }
        },
        include: {
          centers: true
        }
      });

      console.log(user)

      return {
        success: true,
      };
    } catch (err) {
      if (err instanceof ZodError) {
        return fail(400, {
          error: true,
          alert: 'Please check the form for errors.',
          errors: zodErrorSchema(err)
        });
      }

      return fail(500, {
        error: true,
        alert: 'Failed to create admin. Please try again.',
        errors: {}
      });
    }
  }
};
