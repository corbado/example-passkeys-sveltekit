import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');

	return {
		jwt
	};
}) satisfies PageServerLoad;
