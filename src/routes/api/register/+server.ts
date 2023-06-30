// +server.ts
import Session from './session';
import { PUBLIC_CORBADO_FRONTENDAPI_URL } from '$env/static/public';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ request, cookies }) => {
	// Initialize Session class with appropriate parameters
	const shortSessionToken = cookies.get('cbo_short_session');
	const session = new Session(
		'cbo_short_session',
		PUBLIC_CORBADO_FRONTENDAPI_URL,
		PUBLIC_CORBADO_FRONTENDAPI_URL + '/.well-known/jwks',
		60000
	);

	try {
		const user = await session.validateShortSessionValue(shortSessionToken);
		if (!user.isSignedIn) {
			throw error(401, 'Invalid session token');
		}

		cookies.set('signedIn', 'true', {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			secure: true
		});

		throw redirect(303, '/');
	} catch (e) {
		cookies.set('signedIn', 'false', {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			secure: true
		});

		throw redirect(303, '/#login');
	}
}) satisfies RequestHandler;
