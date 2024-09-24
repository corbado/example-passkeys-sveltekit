import { type RequestEvent } from '@sveltejs/kit';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import { CORBADO_API_SECRET } from '$env/static/private';
import { SDK, Config } from '@corbado/node-sdk';

const config = new Config(PUBLIC_CORBADO_PROJECT_ID, CORBADO_API_SECRET);
const sdk = new SDK(config);

export async function load({ cookies }: RequestEvent) {
    const cbo_short_session = cookies.get("cbo_short_session");
    if (!cbo_short_session) {
        return {user: undefined}
    }
    try {
        const user = await sdk.sessions().getCurrentUser(cbo_short_session);
        if (!user.isAuthenticated()) {
            return {user: undefined}
        }
        return { user: { email: user.getEmail(), userID: user.getID() } };
    } catch {
        // session cookie was invalid
        return {user: undefined}
    }
}

function parseCookies(cookieHeader: string): Record<string, string> {
    return Object.fromEntries(
        cookieHeader.split(';').map((cookie) => {
            const [name, ...rest] = cookie.trim().split('=');
            return [name, rest.join('=')];
        })
    );
}
