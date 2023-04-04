import { CORBADO_API_SECRET } from '$env/static/private';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';

interface Corbado {
	sessionToken: string | null;
	userAgent: string | null;
	remoteAddress: string | null;
}

export const GET = (async ({ url, request, getClientAddress }) => {
	const corbado: Corbado = {
		sessionToken: url.searchParams.get('sessionToken'),
		userAgent: request.headers.get('user-agent'),
		remoteAddress: getClientAddress()
	};

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
				remoteAddress: '127.0.0.1'
			}
		})
	});

	console.log(await response.json());
	return new Response('HI');
}) satisfies RequestHandler;
