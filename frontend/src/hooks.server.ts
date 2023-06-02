import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handleFetch: HandleFetch = ({ request, fetch, event }) => {
	const cookieString = event.cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
	// Set cookies coming from the client to pass authentication (On localhost this is not needed because localhost calls localhost)
	request.headers.set('cookie', cookieString);
	//request.credentials = 'include';	// TODO: Is credentials neeeded?

	// Because we are on the same server we can just call the localhost directly without going a roundtrip
	if (request.url.startsWith('http://adonisjs-sveltekit-template/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('http://adonisjs-sveltekit-template/', 'http://localhost:3333/'),
			request
		);
	}

	return fetch(request);
};
