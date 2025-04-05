import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const center = locals.center!;
  
  const classrooms = await prisma.classroom.findMany({
    where: { centerId: center.id },
    orderBy: { createdAt: 'desc' }
  });

  return {
    classrooms
  };
};

export const actions: Actions = {
  delete: async ({ locals, request }) => {
    const center = locals.center!;
    const fd = await request.formData()
    const id = fd.get('id')?.toString()
    
    try {
      await prisma.classroom.delete({
        where: { id }
      });

      return {
        success: true
      }
    } catch (err) {
      return fail(500, {
        error: true,
        alert: 'Failed to delete classroom. Please try again.',
        errors: {}
      });
    }
  }
};
