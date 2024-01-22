import type { PageServerLoad } from './$types';
import {SDK, Config} from '@corbado/node-sdk';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
// @ts-ignore
import { CORBADO_API_SECRET } from '$env/static/private';


const projectID = PUBLIC_CORBADO_PROJECT_ID
const apiSecret = CORBADO_API_SECRET

const config = new Config(projectID, apiSecret);
const sdk = new SDK(config);


export const load = (async ({ cookies }) => {
	//TODO: implement serverside auth state verification here. FIX!!
	const jwt = cookies.get('cbo_short_session')!;
	console.log(jwt)
	const user = await sdk.sessions().getCurrentUser(jwt);
	console.log(user)
	//@ts-ignore
	const authenticated = user.authenticated

	return {
		jwt,
		authenticated
	};
}) satisfies PageServerLoad;
