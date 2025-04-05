import type { PageServerLoad } from './$types';
import prisma from '$lib/server/db';

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
