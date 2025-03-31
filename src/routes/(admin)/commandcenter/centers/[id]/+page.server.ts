import { redirect,fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/db';
import type { Center } from '$lib/types';
import { z, ZodError } from "zod";
import zodErrorSchema from '$lib/utils/zodErrorSchema';

const centerSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(1),
})

export const load: PageServerLoad = async ({ params }) => {
  const center: Center | null = await prisma.center.findUnique({
    where: { id: params.id }
  });

  if (!center) {
    throw redirect(303, '/commandcenter/centers');
  }

  return {
    center,
  };
};

export const actions = {
  update: async ({ request, params }) => {
    let centerData = Object.fromEntries(await request.formData());
    let centerUpdate: { name: string; address: string };

    try {
      centerUpdate = await centerSchema.parseAsync(centerData) ;
      const updatedCenter = await prisma.center.update({
        where: { id: params.id },
        data: centerUpdate,
      });

      return { success: true, center: updatedCenter };
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = zodErrorSchema(err);
        return fail(400, {
          error: true,
          alert: 'Please check the form for errors.',
          errors: formattedErrors,
          center: centerData,
        });
      }

      return fail(400, {
        error: true,
        alert: 'Something bad has happened',
        errors: {},
        center: centerData,
      });
    }
  }
};
