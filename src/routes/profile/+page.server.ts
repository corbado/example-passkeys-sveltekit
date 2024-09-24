import { type RequestEvent } from '@sveltejs/kit';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import { CORBADO_API_SECRET } from '$env/static/private';
import { Config, SDK } from '@corbado/node-sdk';

const config = new Config(
    PUBLIC_CORBADO_PROJECT_ID, CORBADO_API_SECRET,
    `https://${PUBLIC_CORBADO_PROJECT_ID}.frontendapi.corbado.io`,
    'https://backendapi.cloud.corbado.io'
);
const sdk = new SDK(config);

export async function load({ cookies }: RequestEvent) {
    const cbo_short_session = cookies.get('cbo_short_session');
    if (!cbo_short_session) {
        return { user: undefined };
    }
    try {
        const user = await sdk.sessions().validateToken(cbo_short_session);
        return { user: { name: user.fullName, userID: user.userId } };
    } catch (e) {
        console.log(e);
        // session cookie was invalid
        return { user: undefined };
    }
}
