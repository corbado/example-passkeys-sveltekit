<script lang="ts">
	import PasskeyDemo from '$lib/sections/PasskeyDemo.svelte';
	import PasskeyExplainer from '$lib/sections/PasskeyExplainer.svelte';
	import PasskeySaas from '$lib/sections/PasskeySaas.svelte';
	import PasskeyStats from '$lib/sections/PasskeyStats.svelte';
	import PasskeyTimeline from '$lib/sections/PasskeyTimeline.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PasskeyDemo {data} />

<PasskeyExplainer />

<PasskeyTimeline />

<PasskeyStats />

<PasskeySaas />
