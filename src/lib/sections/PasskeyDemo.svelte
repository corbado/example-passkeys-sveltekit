<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
	import Corbado from '@corbado/web-js';
	import { Button, Heading } from 'flowbite-svelte';
	import { onMount, afterUpdate } from 'svelte';

	let scrollVisible = true;
	let authenticated = false;

	onMount(async () => {
		await Corbado.load({
			//@ts-ignore
			projectId: PUBLIC_CORBADO_PROJECT_ID,
			darkMode: 'off'
		});
		authenticated = Corbado.isAuthenticated ?? false;
		if (authenticated) {
			const passkeyListElement = document.getElementById('corbado-passkey-list');
			if (passkeyListElement) {
				Corbado.mountPasskeyListUI(passkeyListElement);
			}
		} else {
			const authElement = document.getElementById('corbado-auth');
			if (authElement) {
				Corbado.mountAuthUI(authElement, {
					onLoggedIn: () => {
						window.location.href = '/';
					},
					isDevMode: true
				});
			}
		}

		const handleScroll = () => {
			scrollVisible = window.scrollY < 50;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function scrollToContinue() {
		window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
	}
</script>

<section class="bg-secondary">
	<div
		class="mx-auto max-w-screen-xl flex flex-col text-center items-center justify-center w-full min-h-screen py-8"
	>
		<Heading tag="h1" class="mb-8 md:mb-12">Passkeys demo</Heading>

		<div
			class="bg-white rounded-xl max-w-[90%] overflow-hidden shadow-lg {authenticated ? 'p-4' : ''}"
		>
			{#if authenticated}
				<Heading tag="h4">That's it.</Heading>
				<Heading tag="h4">You're logged in.</Heading>
				<Button
					pill
					class="bg-primary text-white my-5"
					on:click={() => {
						Corbado.logout();
						authenticated = false;
						window.location.href = '/';
					}}
				>
					Log out
				</Button>
				<Heading tag="h4">These are your passkeys:</Heading>
			{/if}
			<div id="corbado-passkey-list" />
			<div id="corbado-auth" />
		</div>

		<button
			class="invisible md:visible opacity-100 transition-opacity duration-300 absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 py-2 px-4 rounded-full text-black focus:outline-none"
			style="opacity: {scrollVisible ? 1 : 0}; transition: opacity 300ms;"
			on:click={scrollToContinue}
		>
			Scroll to continue
		</button>
	</div>
</section>

<style>
	:global(.cb-passkey-list-details) {
		text-align: left;
	}
	:global(.cb-container) {
		max-width: min(30rem, 90vw) !important;
	}
</style>
