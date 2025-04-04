import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { Role } from '@prisma/client';

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (!user || user?.role !== Role.PARENT) {
    throw redirect(303, '/login');
  }

  return {
    user: locals.user,
  };
};
