import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCenterById } from '$lib/server/collections/centerQueries';
import { getCenterAdminsByCenterId } from '$lib/server/collections/centerAdminQueries';

export const load: PageServerLoad = async ({ params }) => {
  const center = await getCenterById(params.id);

  if (!center) {
    throw redirect(303, '/commandcenter/centers');
  }

  const centerAdmins = await getCenterAdminsByCenterId(center.id);

  return {
    center,
    admins: centerAdmins,
  };
};
