<script lang="ts">
    import Corbado from '@corbado/web-js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let authElement: HTMLDivElement;

    onMount(() => {
        Corbado.mountAuthUI(
            authElement, {
                onLoggedIn: () => goto("/profile"),
            })
    })
</script>

<div bind:this={authElement}></div>