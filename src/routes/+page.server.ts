import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	//TODO: implement serverside auth state verification here
	const jwt = cookies.get('cbo_short_session');
	console.log(jwt);

	return {
		jwt
	};
}) satisfies PageServerLoad;
