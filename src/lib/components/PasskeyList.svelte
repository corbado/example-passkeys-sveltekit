<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
	import PasskeyListItem from './PasskeyListItem.svelte';
    import type Passkey from './passkey';

	let passkeys: Passkey[] = [];

	async function getPasskeys() {
        const cookies = document.cookie
		const url = `https://${PUBLIC_CORBADO_PROJECT_ID}.frontendapi.corbado.io/v1/me/passkeys`;
        const options = {
            method: 'GET',
            headers: {
                'Cookie': cookies
            }
        };
		const response = await fetch(url);
		const data = await response.json();
        if (typeof data === "object") {
            passkeys = [data]
        } else {
            passkeys = data.data.passkeys;
        }
	}

	// Call getPasskeys function on component mount
	// You can use onMount from 'svelte' if you want this to run only when the component mounts
	getPasskeys();
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
