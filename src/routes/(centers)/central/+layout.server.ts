import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }
  if (!["SUPER_ADMIN", "ADMIN"].includes(locals?.user?.role ?? "")) {
    throw redirect(303, '/login');
  }

	if (!locals.center) {
		throw redirect(303, '/commandcenter');
	}

  return {
    user: locals.user,
    center: locals.center,
  };
};
