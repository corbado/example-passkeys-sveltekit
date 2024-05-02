<script lang="ts">
    import Corbado from "@corbado/web-js";
    import {onMount} from "svelte";
    import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';


    let isInitialized = false;
    onMount(async () => {
        await Corbado.load({
            projectId: PUBLIC_CORBADO_PROJECT_ID,
            darkMode: 'off',
            setShortSessionCookie: true
        });
        isInitialized = true; // Set to true once Corbado is initialized
    });
</script>

<div>
    {#if isInitialized}
        <slot></slot>
    {/if}
</div>