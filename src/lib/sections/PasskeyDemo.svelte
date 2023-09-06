<script>
	import {PUBLIC_CORBADO_FRONTENDAPI_URL, PUBLIC_CORBADO_PROJECT_ID} from '$env/static/public';
	import Corbado from '@corbado/webcomponent';
	import '@corbado/webcomponent/pkg/auth_cui.css';
	import { Button, Card, Heading } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	export let data;

	let scrollVisible = true;
	let username = '';
	const corbado = new Corbado.Session(PUBLIC_CORBADO_PROJECT_ID);

	const corbadoUser = corbado.refresh((user) => {
		console.log(user);
	});

	onMount(() => {
		username = localStorage.getItem('username') || '';
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

<section class="bg-secondary h-screen">
	<div
		class="mx-auto max-w-screen-xl flex flex-col text-center items-center justify-center w-full h-full"
	>
		<Heading tag="h1" class="mb-8 md:mb-16">Passkeys demo</Heading>
		<Card class="w-11/12 md:w-full mb-16">
			{#if data && data.jwt}
				<Heading tag="h4">That’s it.</Heading>
				<Heading tag="h4">You’re logged in.​</Heading>
				<Button href="/api/logout" pill class="bg-primary text-white mt-8 ">Log out</Button>
			{:else}
				<corbado-auth
					style="border: none; padding: 0px"
					endpoint={PUBLIC_CORBADO_FRONTENDAPI_URL}
					conditional="yes"
					auto_detect_language="no"
					fallback_language="en"
					login_title="Try passkey login"
					login_btn="Passkey login"
					register_title="Try passkey signup"
					register_btn="Passkey signup"
					page={data.signedIn ? 'login' : 'register'}
				>
					<input
						name="username"
						id="corbado-username"
						value={username}
						required
						autocomplete="webauthn"
					/>
				</corbado-auth>
			{/if}
		</Card>
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
	corbado-auth {
		--primary-color: #1953ff;
		--primary-color-rgb: 25, 83, 255;
		--primary-background-color: transparent;
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
</style>
