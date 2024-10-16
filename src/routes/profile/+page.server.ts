import { type RequestEvent } from '@sveltejs/kit';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import { CORBADO_API_SECRET } from '$env/static/private';
import { CORBADO_FRONTEND_API } from '$env/static/private';
import { CORBADO_BACKEND_API } from '$env/static/private';
import { SDK, Config } from '@corbado/node-sdk';

const config = new Config(PUBLIC_CORBADO_PROJECT_ID, CORBADO_API_SECRET, CORBADO_FRONTEND_API, CORBADO_BACKEND_API);
const sdk = new SDK(config);

export async function load({ cookies }: RequestEvent) {
    const sessionToken = cookies.get("cbo_session_token");
    if (!sessionToken) {
        return {user: undefined}
    }

    try {
        const user = await sdk.sessions().validateToken(sessionToken);

        return { user: { userId: user.userId, fullName: user.fullName } };
    } catch {
        // session token was invalid
        return {user: undefined}
    }
}