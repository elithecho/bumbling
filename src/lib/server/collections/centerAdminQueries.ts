import prisma from '$lib/server/db';
import type { CenterAdmin } from '$lib/types';

export async function getCenterAdminsByCenterId(centerId: string): Promise<CenterAdmin[] | null> {
  return await prisma.centerAdmin.findMany({
    where: { centerId },
    include: { user: true }
  });
}
