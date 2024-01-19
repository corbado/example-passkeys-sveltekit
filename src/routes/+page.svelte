<script lang="ts">
    import Footer from '$lib/sections/Footer.svelte';
    import PasskeyDemo from '$lib/sections/PasskeyDemo.svelte';
    import PasskeyExplainer from '$lib/sections/PasskeyExplainer.svelte';
    import PasskeySaas from '$lib/sections/PasskeySaas.svelte';
    import PasskeyStats from '$lib/sections/PasskeyStats.svelte';
    import PasskeyTimeline from '$lib/sections/PasskeyTimeline.svelte';
    import PasskeyList from '$lib/components/PasskeyList.svelte';
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net"/>
    <link
            href="https://fonts.bunny.net/css?family=inter:100,200,300,400,500,600,700,800,900|space-grotesk:300,400,500,600,700"
            rel="stylesheet"
    />
    <title>Passkeys Demo: Try Passkeys with Face ID & Touch ID</title>
    <meta name="description"
          content="Experience Passwordless Logins with the Free Passkeys Demo. Use Face ID, Touch ID, Android Biometrics or Windows Hello
          instead of Passwords."/>
    <meta property="og:title" content="Passkeys Demo"/>
    <meta
            property="og:description"
            content="Passkeys Demo for best Passwordless Logins"
    />
    <meta property="og:image" content="passkeys-demo-image.png"/>
    <meta property="og:url" content="https://passkeys.eu"/>
    <meta property="og:type" content="website"/>
</svelte:head>

<PasskeyList />

<PasskeyDemo {data}/>

<PasskeyExplainer/>

<PasskeyTimeline/>

<PasskeyStats/>

<PasskeySaas/>

<Footer/>
