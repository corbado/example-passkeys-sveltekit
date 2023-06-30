import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const signedIn = cookies.get('signedIn');
	const jwt = cookies.get('cbo_short_session');
	console.log(signedIn);
	console.log(jwt);

	return {
		jwt,
		signedIn
	};
}) satisfies PageServerLoad;
