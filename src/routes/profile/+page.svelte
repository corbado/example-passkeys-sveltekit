<script lang="ts">
    import type { PageData } from './$types';
    import Corbado from '@corbado/web-js';
    import { goto } from '$app/navigation';

    export let data: PageData

    async function handleLogout() {
        await Corbado.logout()
        await goto("/")
    }
</script>

<div>
    {#if (data.user)}
        <h1>
            Profile Page
        </h1>
        <p>
            User-ID: {data.user.userId}
        </p>
        <p>
            Full name: {data.user.fullName}
        </p>
        <button on:click={handleLogout}>
            Logout
        </button>
    {:else}
        <h1>
            You aren't logged in.
        </h1>
        <p>Go <a href="/">Home</a></p>
    {/if}
</div>