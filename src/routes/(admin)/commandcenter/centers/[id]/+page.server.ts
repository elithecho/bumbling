import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/db';
import type { Center } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const center: Center | null = await prisma.center.findUnique({
    where: { id: params.id }
  });

  if (!center) {
    throw redirect(303, '/commandcenter/centers');
  }

  return {
    center
  };
};
