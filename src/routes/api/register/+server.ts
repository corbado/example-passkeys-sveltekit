import { CORBADO_API_SECRET } from '$env/static/private';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ url, request, getClientAddress, cookies }) => {
	const corbado = {
		sessionToken: url.searchParams.get('sessionToken') || '',
		userAgent: request.headers.get('user-agent'),
		remoteAddress: getClientAddress()
	};

	console.log(corbado.remoteAddress);

	const response = await fetch('https://api.corbado.com/v1/sessions/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${btoa(`${PUBLIC_CORBADO_PROJECT_ID}:${CORBADO_API_SECRET}`)}`
		},
		body: JSON.stringify({
			token: corbado.sessionToken,
			clientInfo: {
				userAgent: corbado.userAgent,
				remoteAddress: corbado.remoteAddress
			}
		})
	});

	if (response.status !== 200) {
		throw error(401, 'Invalid session token');
	}

	cookies.set('signedIn', 'true', {
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secure: true
	});

	cookies.set('jwt', crypto.randomUUID(), {
		httpOnly: true,
		path: '/',
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 // 1 day
	});

	throw redirect(303, '/');
}) satisfies RequestHandler;
