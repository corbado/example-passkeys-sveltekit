<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import PasskeyListItem from './PasskeyListItem.svelte';
    import type Passkey from './passkey';

	let passkeys: Passkey[] = [];

	async function getPasskeys() {
		const url = `https://${PUBLIC_CORBADO_PROJECT_ID}.frontendapi.corbado.io/v1/me/passkeys`;
		try { //TODO: doesnt work independent of cookie settings
            const response = await axios.get(url, {
                withCredentials: true,
                headers: {
                    'X-Corbado-ProjectID': PUBLIC_CORBADO_PROJECT_ID,
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
	})
</script>

<section>
	{#if passkeys.length > 0}
		<ul>
			{#each passkeys as passkey}
				<li><PasskeyListItem {passkey} /></li>
			{/each}
		</ul>
	{:else}
		<p>Loading passkeys...</p>
	{/if}
</section>
