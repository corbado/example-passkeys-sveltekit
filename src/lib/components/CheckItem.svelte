<script lang="ts">
	import { Badge, P } from 'flowbite-svelte';

	export let title: string;
</script>

<div class="flex flex-row">
	<Badge rounded large class="!p-1.5 !font-semibold">
		<svg
			aria-hidden="true"
			class="w-3.5 h-3.5 fill-blue-500"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
				clip-rule="evenodd"
			/></svg
		>
		<span class="sr-only">Icon description</span>
	</Badge>
	<P class="self-center ml-2" size="sm">{title}</P>
	<slot name="icon" />
</div>
