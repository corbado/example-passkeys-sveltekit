<script lang="ts">
    import Corbado from '@corbado/web-js';
    import {onMount} from 'svelte';

    let authElement: HTMLDivElement;

    onMount(() => {
        Corbado.mountAuthUI(
            authElement, {
                onLoggedIn: () => window.location.href = "/profile",
            })
    })
</script>

<div bind:this={authElement}></div>