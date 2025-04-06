import type { PageServerLoad } from './$types';
import prisma from '$lib/server/db';

export const load: PageServerLoad = async ({ locals, params }) => {
  const center = locals.center!;

  const classroom = await prisma.classroom.findUnique({
    where: {
      id: params.id,
      centerId: center.id,
    }
  });

  return {
    classroom
  };
};

