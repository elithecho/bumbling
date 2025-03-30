import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session?.id || !locals.user?.id) {
    throw redirect(303, '/login');
  }

  return {};
};
