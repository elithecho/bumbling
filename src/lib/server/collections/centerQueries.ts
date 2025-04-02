import prisma from '$lib/server/db';
import type { Center } from '$lib/types';

export async function getCenterById(id: string): Promise<Center | null> {
  return prisma.center.findUnique({
    where: { id }
  });
}
