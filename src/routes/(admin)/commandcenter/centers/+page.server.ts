import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/db';

export const load: PageServerLoad = async () => {
  const centers = await prisma.center.findMany();

  return {
    centers
  };
};
