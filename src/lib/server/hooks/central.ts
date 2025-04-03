import type { Center } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import prisma from '$lib/server/db';

export function getCenterFromAdmin(userId: string): Promise<Center | null> {
  const centerAdmin = prisma.centerAdmin.findUnique({
    where: {
      userId: userId
    },
    include: {
      center: true
    }
  })

  return centerAdmin.then(ca => ca?.center ?? null);
}

export function getCenterFromCookie(event: RequestEvent): Promise<Center | null> {
  const centerId = event.cookies.get('centerCookie');
  if (centerId === undefined) {
    return Promise.resolve(null);
  }
  const center = prisma.center.findUnique({
    where: {
      id: centerId
    }
  });
  return center;
}
