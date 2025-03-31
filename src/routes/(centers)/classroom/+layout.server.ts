import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }: { locals: { user: User | null } }) => {
	// Guard: Check if user exists and has the required role
	if (locals?.user?.role !== 'TEACHER') {
		throw redirect(303, '/login');
	}

	// Pass user data to the layout/page
	return {
		user: locals.user
	};
};
