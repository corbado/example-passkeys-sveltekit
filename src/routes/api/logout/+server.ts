import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (({ cookies }) => {
	cookies.set('jwt', '', {
		path: '/',
		expires: new Date(0)
	});

	throw redirect(303, '/');
}) satisfies RequestHandler;
