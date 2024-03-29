// +server.ts
import Session from './session';
import {PUBLIC_CORBADO_PROJECT_ID} from '$env/static/public';
import {error, redirect, type RequestHandler} from '@sveltejs/kit';

const corbadoFrontendAPIURL = `https://${PUBLIC_CORBADO_PROJECT_ID}.frontendapi.corbado.io`

export const GET = (async ({request, cookies}) => {
    // Initialize Session class with appropriate parameters
    const shortSessionToken = cookies.get('cbo_short_session');
    const session = new Session(
        'cbo_short_session',
        corbadoFrontendAPIURL,
        corbadoFrontendAPIURL + '/.well-known/jwks',
        60000
    );

    try {
        const user = await session.validateShortSessionValue(shortSessionToken);
        if (!user.isSignedIn) {
            throw error(401, 'Invalid session token');
        }

        throw redirect(303, '/');
    } catch (e) {
        throw redirect(303, '/#login');
    }
}) satisfies RequestHandler;
