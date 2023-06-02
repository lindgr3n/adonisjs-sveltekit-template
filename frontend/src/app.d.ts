// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
//import User from '../../backend/app/Models/User';
//console.log('WOHOOO', User);

declare global {
	// How can we get this from adonis?
	interface User {
		id: number;
	}
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
