import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/server/user/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }: { locals: { user: User | null } }) => {
	if (!locals.user || locals.user.role !== 'SUPER_ADMIN') {
		throw redirect(303, '/login');
	}

	return {
		user: locals.user
	};
};
