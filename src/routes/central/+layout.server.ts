import { redirect } from '@sveltejs/kit';
import type { User } from '$lib/types'; // Assuming User type is defined here
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }: { locals: { user: User | null } }) => {
	// Check if user exists and has the required role
	if (!locals.user || (locals.user.role !== 'SUPER_ADMIN' && locals.user.role !== 'ADMIN')) {
		// Redirect to login if not authorized
		throw redirect(303, '/login');
	}

	// Return the user data if authorized
	return {
		user: locals.user
	};
};
