<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID, PUBLIC_BASE_REQUEST_URL } from '$env/static/public';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import PasskeyListItem from './PasskeyListItem.svelte';
	import type Passkey from './passkey';

	let passkeys: Passkey[] = [];
	//TODO: add loading state
	async function getPasskeys() {
		const url = `${PUBLIC_BASE_REQUEST_URL}/v1/me/passkeys`;
		try {
			const response = await axios.get(url, {
				withCredentials: true,
				headers: {
					'X-Corbado-ProjectID': PUBLIC_CORBADO_PROJECT_ID
				}
			});
			const passkeyData = response.data.data.passkeys;
			if (!Array.isArray(passkeyData)) {
				passkeys = [passkeyData];
			} else {
				passkeys = passkeyData;
			}
		} catch (error) {
			console.error('Error fetching passkeys:', error);
		}
	}
	onMount(() => {
		getPasskeys();
	});
</script>

{#if passkeys.length > 0}
	<section class="bg-white shadow-lg rounded-xl py-4 px-6 text-left">
		<h2 class="my-2 text-xl">Your passkeys:</h2>
		<ul>
			{#each passkeys as passkey}
				<li>
					<PasskeyListItem {passkey} />
				</li>
			{/each}
		</ul>
	</section>
{/if}
