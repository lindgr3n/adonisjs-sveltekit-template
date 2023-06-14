import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async function ({ locals }) {
	console.log('CURRENT USER', locals.user);

	if (!locals.user) {
		throw redirect(307, '/login');
	}
	return { user: locals.user, test: 1235 };
};

export const actions: Actions = {
	default: async (event) => {
		return {};
	}
};
