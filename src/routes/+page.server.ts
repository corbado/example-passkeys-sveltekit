import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');
	const signedIn = cookies.get('signedIn');

	return {
		jwt,
		signedIn
	};
}) satisfies PageServerLoad;
