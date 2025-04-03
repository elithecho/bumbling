import { z, ZodError } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import zodErrorSchema from '$lib/utils/zodErrorSchema';
import prisma from '$lib/server/db';

export const load: PageServerLoad = (async ({ parent }) => {
  const { center } = await parent();

  const announcements = await prisma.centerAnnouncement.findMany({
    where: { centerId: center.id },
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  return { announcements };
});

const announcementSchema = z.object({
  message: z.string().min(1, 'Message is required')
});

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const center = locals.center!;
    const user = locals.user!;

    const formData = Object.fromEntries(await request.formData());

    try {
      const data = await announcementSchema.parseAsync(formData);
      const announcement = await prisma.centerAnnouncement.create({
        data: {
          message: data.message,
          userId: user.id,
          centerId: center.id
        },
        include: { user: true }
      });

      return { success: true, announcement };
    } catch (err) {
      console.error('Error creating announcement:', err);
      if (err instanceof ZodError) {
        return fail(400, {
          error: true,
          alert: 'Please check the form for errors.',
          errors: zodErrorSchema(err),
          message: formData.message
        });
      }

      return fail(500, {
        error: true,
        alert: 'Failed to create announcement. Please try again.',
        errors: {},
        message: formData.message
      });
    }
  }
};
