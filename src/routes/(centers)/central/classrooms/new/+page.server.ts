import { z, ZodError } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/server/db';
import zodErrorSchema from '$lib/utils/zodErrorSchema';
import { redirect } from '@sveltejs/kit';

const classroomSchema = z.object({
  level: z.string().min(1, 'Level is required'),
  name: z.string().min(1, 'Name is required')
});

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const center = locals.center!;
    const formData = Object.fromEntries(await request.formData());

    try {
      const data = await classroomSchema.parseAsync(formData);
      const classroom = await prisma.classroom.create({
        data: {
          level: data.level,
          name: data.name,
          centerId: center.id
        }
      });

      throw redirect(303, '/central/classrooms');
    } catch (err) {
      if (err instanceof ZodError) {
        return fail(400, {
          error: true,
          alert: 'Please check the form for errors.',
          errors: zodErrorSchema(err),
          data: formData
        });
      }

      return fail(500, {
        error: true,
        alert: 'Failed to create classroom. Please try again.',
        errors: {},
        data: formData
      });
    }
  }
};
