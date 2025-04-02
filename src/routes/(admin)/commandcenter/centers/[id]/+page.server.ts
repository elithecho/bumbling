import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCenterById } from '$lib/server/collections/centerQueries';
import { getCenterAdminCountByCenterId, getCenterAdminsByCenterId } from '$lib/server/collections/centerAdminQueries';
import type { CenterAdminWithUser } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const center = await getCenterById(params.id);

  if (!center) {
    throw redirect(303, '/commandcenter/centers');
  }

  const centerAdminsCount = await getCenterAdminCountByCenterId(center.id);
  const admins = await getCenterAdminsByCenterId(center.id);

  return {
    center,
    adminsCount: centerAdminsCount,
    admins: {
      items: admins as CenterAdminWithUser[],
      total: centerAdminsCount,
    },
  };
};
