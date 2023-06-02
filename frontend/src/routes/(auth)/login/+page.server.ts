import { env } from '$env/dynamic/private';
import { setResponseCookie } from '../../../lib/server/cookie';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async function () {
	return { test: 123 };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return fail(400, { email, missing: true });
		}
		if (!password) {
			return fail(400, { email, incorrect: true });
		}

		// Register
		const response = await fetch(`${env.BACKEND_URL}/login`, {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			// TODO: Set cookie
			const cookiesToSet = response.headers.get('set-cookie');
			setResponseCookie(cookies, cookiesToSet);
			return {
				success: true
			};
		} else if (response.status === 409) {
			// Handle the 409 Conflict status code
			const errorData = await response.json();
			console.log(errorData);

			return fail(409, { error: errorData.message });
		} else {
			return fail(response.status, { error: 'An error occurred' });
		}
	}
} satisfies Actions;
