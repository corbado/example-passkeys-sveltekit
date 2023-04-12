<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/sections/Footer.svelte';
	import PasskeyDemo from '$lib/sections/PasskeyDemo.svelte';
	import PasskeyExplainer from '$lib/sections/PasskeyExplainer.svelte';
	import PasskeySaas from '$lib/sections/PasskeySaas.svelte';
	import PasskeyStats from '$lib/sections/PasskeyStats.svelte';
	import PasskeyTimeline from '$lib/sections/PasskeyTimeline.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		if (data.signedIn !== undefined && data.signedIn) {
			goto('/#login');
		}
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.bunny.net" />
	<link href="https://fonts.bunny.net/css?family=inter:500|space-grotesk:500" rel="stylesheet" />
	<title>Corbado Passkey demo</title>
	<meta name="description" content="Corbado Passkey passwordless authentication demo" />
</svelte:head>

<PasskeyDemo {data} />

<PasskeyExplainer />

<PasskeyTimeline />

<PasskeyStats />

<PasskeySaas />

<Footer />
