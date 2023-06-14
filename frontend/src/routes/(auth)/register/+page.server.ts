import { env } from '$env/dynamic/private';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load = async function () {
	return {};
} satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		// TODO: VERIFY INPUT
		if (!email) {
			return fail(400, { email: 'Missing' });
		}

		// Register
		const response = await fetch(`${env.BACKEND_URL}/register`, {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			// TODO: redirect to login
			return {
				success: true
			};
		} else if (response.status === 409) {
			// Handle the 409 Conflict status code
			const errorData = await response.json();
			console.log(errorData);

			return fail(409, { error: errorData.message });
			// return {
			// 	status: 409,
			// 	error: new Error(errorData.message)
			// };
		} else {
			return fail(response.status, { error: 'An error occurred' });
		}
	}
};
