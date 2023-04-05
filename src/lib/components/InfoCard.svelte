<script lang="ts">
	import { Card, Heading, P } from 'flowbite-svelte';

	export let title: string;
	export let reason: string;
	export let stat: string;
	export let statReason: string;
</script>

<Card class="w-72 m-4 z-10">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="w-16 h-16 fill-blue-400 self-center mb-4"
	>
		<slot name="icon" />
	</svg>
	<Heading tag="h6" class="text-info mb-4">{title}</Heading>
	<P class="text-center">{reason}</P>
	<Heading tag="h4" class="my-2">{stat}</Heading>
	<P class="text-center">{statReason}</P>
</Card>
