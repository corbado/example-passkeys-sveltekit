<script>
	import corbado from '$lib/assets/corbado.png';
	import github from '$lib/assets/github.png';
	import slack from '$lib/assets/slack.png';
	import x from '$lib/assets/x-logo.svg';
	import { A, FooterBrand, Heading, Img } from 'flowbite-svelte';
</script>

<div
	class="mx-auto max-w-screen-xl flex flex-col text-center items-center justify-center w-full h-full mb-32"
>
	<Heading class="mb-6" tag="h3">Powered by</Heading>
	<div class="mb-16">
		<FooterBrand href="https://www.corbado.com" src={corbado} alt="Corbado Logo" name="Corbado" />
	</div>
	<div>
		<Heading class="mb-6" tag="h3">Join the discussion</Heading>
		<div class="flex flex-row items-center justify-center gap-x-8">
			<A
				href="https://join.slack.com/t/corbado/shared_invite/zt-1b7867yz8-V~Xr~ngmSGbt7IA~g16ZsQ"
				target="_blank"
			>
				<Img src={slack} size="w-10" />
			</A>
			<A href="https://github.com/corbado" target="_blank">
				<Img src={github} size="w-10" />
			</A>
			<A href="https://twitter.com/corbado_tech" target="_blank">
				<Img src={x} size="w-10" />
			</A>
		</div>
	</div>
</div>
