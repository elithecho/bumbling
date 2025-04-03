import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import prisma from '$lib/server/db';

export const load: PageServerLoad = async () => {
  const centers = await prisma.center.findMany();

  return {
    centers
  };
};

export const actions: Actions  = {
  gotoCenter: async ({ request, cookies }) => {
    const formData = await request.formData();
    const centerId = formData.get('centerId')! as string;

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
    cookies.set('centerCookie', centerId, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt
    });

    redirect(302, `/central`);
  }
} satisfies Actions;
