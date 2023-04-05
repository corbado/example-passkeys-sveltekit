<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
	import { Button, Card, Heading } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from '../../routes/$types';

	export let data: PageData;

	let scrollVisible = true;

	onMount(() => {
		const handleScroll = () => {
			scrollVisible = window.scrollY < 50;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<script defer src="https://auth.corbado.com/auth.js"></script>
</svelte:head>

<section class="bg-secondary h-screen">
	<div
		class="mx-auto max-w-screen-xl flex flex-col text-center items-center justify-center w-full h-full"
	>
		<Heading tag="h1" class="mb-8 md:mb-32">Passkey authentication demo</Heading>
		{#if data && data.jwt}
			<Card class="w-full">
				<Heading tag="h4">That’s it. You’re logged in.​</Heading>
				<Button href="/api/logout" pill class="bg-primary text-white mt-32 mb-8">Log out</Button>
			</Card>
		{:else}
			<Card class="w-full">
				<corbado-auth
					style="border: none"
					project_id={PUBLIC_CORBADO_PROJECT_ID}
					conditional="yes"
					login_title="Try passkey login"
					login_btn="Passkey login"
					register_title="Try passkey signup"
					register_btn="Passkey signup"
					page="register"
				>
					<input name="username" id="corbado-username" value="" required autocomplete="webauthn" />
				</corbado-auth>
			</Card>
		{/if}
		<div
			class="scroll-to-continue"
			style="opacity: {scrollVisible ? 1 : 0}; transition: opacity 300ms;"
		>
			Scroll to continue
		</div>
	</div>
</section>

<style>
	corbado-auth {
		--primary-color: #1953ff;
		--primary-color-rgb: 25, 83, 255;
		--primary-background-color: #1953ff;
		--primary-hover-color: #1145df;

		--secondary-font-color: #59acff;
		--secondary-background-color: transparent;
		--secondary-border-color: #59acff;

		--secondary-background-hover-color: transparent;
		--secondary-border-hover-color: #59acff;
		--secondary-font-hover-color: #59acff;
		--heading-color: #000;
		--text-color: #000;
		--text-disabled-color: #999;
		--light-color: #59acff;
		--error-color: #ff4c51;
		--primary-font: 'Space Grotesk', sans-serif;
		--secondary-font: 'Inter', sans-serif;
		--border-color: rgba(143, 155, 191, 0.5);
		--email-provider-btn-color: rgba(143, 155, 191, 0.5);
	}

	.scroll-to-continue {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(255, 255, 255, 0.7);
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		text-align: center;
		color: #000;
	}
</style>
