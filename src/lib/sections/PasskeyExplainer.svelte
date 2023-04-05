<script lang="ts">
	import sample from '$lib/assets/auth-sample.svg';
	import { Heading, Img, P } from 'flowbite-svelte';
</script>

<section class="bg-white">
	<div
		class="flex flex-col justify-between gap-2 py-8 px-4 mx-auto max-w-screen-xl md:py-32 md:px-12 md:flex-row"
	>
		<div class="w-full text-center md:text-start">
			<Heading tag="h6" class="text-info mb-4">IMPROVE CONVERSION WHILE BOOSTING SECURITY</Heading>
			<Heading tag="h2" class="mb-8">What are passkeys?</Heading>
			<P class="mb-8">
				Passkeys replace passwords and allow users to login with, e.g. Face ID or Touch ID, instead
				of coming up with and remembering complex passwords. They are a secure and convenient form
				of passwordless authentication.
			</P>
			<P class="mb-8">
				Do you also want to offer your customers the simplicity and security of Face ID or
				fingerprint login via passkeys?​
			</P>
		</div>
		<div class="w-full">
			<Img src={sample} size="max-w-full" alt="authentication sample" />
		</div>
	</div>
</section>
