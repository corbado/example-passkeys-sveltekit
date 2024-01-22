<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID, PUBLIC_BASE_REQUEST_URL } from '$env/static/public';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import PasskeyListItem from './PasskeyListItem.svelte';
	import { Button } from 'flowbite-svelte';
	import type Passkey from './passkey';
	import { startRegistration } from '@simplewebauthn/browser';

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
	function getDeleteFunctionForPasskey(passkey: Passkey): () => Promise<void> {
		return async () => {
			const confirmed = confirm('Are you sure you want to delete this passkey?');

			// Proceed only if confirmed
			if (confirmed) {
				try {
					const url = `${PUBLIC_BASE_REQUEST_URL}/v1/me/passkeys/${passkey.id}`;

					// Make the API request to delete the passkey using Axios
					await axios.delete(url, {
						headers: {
							'X-Corbado-ProjectID': PUBLIC_CORBADO_PROJECT_ID
						},
						withCredentials: true // Include credentials in the request
					});

					console.log('Passkey deleted successfully');
					passkeys = passkeys.filter((otherPasskey) => otherPasskey.id !== passkey.id);
					// Update your UI accordingly
				} catch (error) {
					console.error('Error deleting passkey:', error);
					// Handle errors (Axios throws an error for non-2xx responses)
				}
			}
		};
	}
	async function createPasskey() {
		try {
			const responseStart = await axios.post(
				`${PUBLIC_BASE_REQUEST_URL}/v1/users/passkey/append/start`,
				{},
				{
					withCredentials: true,
					headers: {
						'X-Corbado-ProjectID': PUBLIC_CORBADO_PROJECT_ID
					}
				}
			);
			const challenge = JSON.parse(responseStart.data.data.challenge);
			const creationOptions = challenge.publicKey;
			const publicKeyCredential = await startRegistration(creationOptions);

			const responseFinish = await axios.post(
				`${PUBLIC_BASE_REQUEST_URL}/v1/users/passkey/append/finish`,
				{
					signedChallenge: JSON.stringify(publicKeyCredential)
				},
				{
					withCredentials: true,
					headers: {
						'X-Corbado-ProjectID': PUBLIC_CORBADO_PROJECT_ID
					}
				}
			);
			if (responseFinish.status === 200) {
				getPasskeys();
			} else {
				throw Error;
			}
		} catch(e) {
			console.log('Error appending passkey', e);
		}
	}
	onMount(() => {
		getPasskeys();
	});
</script>

<section class="bg-white shadow-lg rounded-xl py-4 px-6 text-left">
	{#if passkeys.length > 0}
		<h2 class="my-2 text-xl">Your passkeys:</h2>
		<ul>
			{#each passkeys as passkey}
				<li>
					<PasskeyListItem {passkey} handlePasskeyDelete={getDeleteFunctionForPasskey(passkey)} />
				</li>
			{/each}
		</ul>
	{:else}
		<h3 class="text-xl font-bold">You don't have any passkeys yet</h3>
		<Button pill class="bg-primary text-white mt-2 w-full" on:click={createPasskey}
			>Create passkey</Button
		>
	{/if}
</section>
