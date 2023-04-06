<script lang="ts">
	import devices from '$lib/assets/devices.svg';
	import europe from '$lib/assets/europe.png';
	import CheckItem from '$lib/components/CheckItem.svelte';
	import { Button, Heading, Img, P } from 'flowbite-svelte';
</script>

<section class="bg-white">
	<div
		class="flex flex-col justify-between items-center gap-2 py-8 px-4 mx-auto max-w-screen-xl md:py-32 md:px-12 md:flex-row"
	>
		<div class="w-full text-center md:text-start">
			<Heading tag="h6" class="text-info mb-4">CORBADO OFFERS PASSKEYS-AS-A-SERVICE</Heading>
			<Heading tag="h2" class="mb-8">How to integrate passkeys?</Heading>
			<P class="mb-8">
				Corbado helps you transition your users to passkeys risk-free within &lt1 hour. Provide the
				best passwordless login experience now.
			</P>
			<Button
				href="https://app.corbado.com/signin#register"
				pill
				target="_blank"
				class="bg-primary text-white hover:bg-hover"
			>
				Start for free
			</Button>
			<div class="flex flex-col items-center md:flex-row gap-4 mt-8 mb-4 md:mb-0">
				<CheckItem title="Keep all user data" />
				<CheckItem title="Integration in <1h" />
				<CheckItem title="GDPR compliant">
					<svelte:fragment slot="icon">
						<Img src={europe} class="rounded-full ml-2" size="w-7" />
					</svelte:fragment>
				</CheckItem>
			</div>
		</div>
		<div class="w-full">
			<Img src={devices} size="max-w-full" alt="authentication sample" />
		</div>
	</div>
</section>
