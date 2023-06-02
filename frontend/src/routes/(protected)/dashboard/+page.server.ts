import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async function ({ locals }) {
	if (!locals.user) {
		throw redirect(307, '');
	}
	return { test: 1235 };
};

export const actions: Actions = {
	default: async (event) => {
		return {};
	}
};
