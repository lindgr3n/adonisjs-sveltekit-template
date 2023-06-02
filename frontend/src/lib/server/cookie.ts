import type { Cookies } from '@sveltejs/kit';
import setCookie, { type Cookie } from 'set-cookie-parser';

export function setResponseCookie(cookies: Cookies, cookiesToSet: string | null) {
	if (cookiesToSet) {
		const c = setCookie.parse(setCookie.splitCookiesString(cookiesToSet));

		c.forEach((c: Cookie) => {
			const { name, value, ...rest } = c;
			cookies.set(
				name,
				value,
				Object.assign({ ...rest }, { secure: false }, { sameSite: true }) // TODO: Verify sameSite value
			);
		});
	}
}
