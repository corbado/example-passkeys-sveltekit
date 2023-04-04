<script lang="ts">
	import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
	import { Card, Heading } from 'flowbite-svelte';
</script>

<svelte:head>
	<script defer src="https://auth.corbado.com/auth.js"></script>
</svelte:head>

<section class="bg-secondary">
	<div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-32 lg:px-12">
		<div class="flex flex-col items-center text-center">
			<Heading tag="h1" class="mb-8">Passkey authentication demo</Heading>
			<Card class="w-full">
				<corbado-auth style="border: none" project_id={PUBLIC_CORBADO_PROJECT_ID} conditional="yes">
					<input name="username" id="corbado-username" value="" required autocomplete="webauthn" />
				</corbado-auth>
			</Card>
			<div
				class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
			/>
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
</style>
