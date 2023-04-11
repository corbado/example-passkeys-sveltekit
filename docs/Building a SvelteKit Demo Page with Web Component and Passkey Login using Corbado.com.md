# Building a SvelteKit Demo Page with Web Component and Passkey Login using Corbado.com

In this blog post, we'll be walking through the process of building a demo page for [corbado.com](https://corbado.com/) using SvelteKit. We'll cover how to create a reusable web component and implement passkey login functionality for a seamless user experience. This tutorial assumes basic familiarity with SvelteKit, HTML, CSS and Javascript. Let's dive in!

## Setting up the SvelteKit project

We'll follow along by cloning our [demo repository](https://github.com/corbado/passkeys-demo) with the finished code, but in case you are interested in how you'd set up the skeleton of the project, check out the next 2 sections. Otherwise, you can skip them.

We will be using [Flowbite](https://flowbite-svelte.com/pages/getting-started), which is a component library based on [TailwindCSS](https://tailwindcss.com) to quickly build a responsive and aesthetic UI.
Let's start out by installing SvelteKit. We are going to use [pnpm](https://pnpm.io) instead of `npm`, as `pnpm` is faster by using symlinks to reuse existing dependencies. To install `pnpm`, run:

```bash
npm install -g pnpm
```

Once we've done that, we can install SvelteKit and initialize our project:

```bash
pnpm create svelte@latest passkeys-demo
cd passkeys-demo
pnpm install
```

Then, we'll have to install tailwindcss:

```bash
pnpx svelte-add@latest tailwindcss
pnpm i
```

Lastly, we'll have to install Flowbite's svelte library

```bash
pnpm i flowbite flowbite-svelte classnames @popperjs/core
```

Finally, we'll update our `tailwind.config.cjs` to include Flowbite:

```js
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};

module.exports = config;
```

## Setting up fonts and global styles using Tailwind

To set up some standard fonts and styles that should be global for our application, we can use Tailwind theming. First, we'll create a `<svelte:head>` section in our root `+page.svelte`. This behaves like a standard html `<head>` you'd find in the `index.html` file, it contains metadata and allows you to include third party scripts. We are going to use it to include some fonts from [Bunny Fonts](https://fonts.bunny.net/) and add some metadata for SEO. Add this to your `+page.svelte`:

```html
<svelte:head>
	<link rel="preconnect" href="https://fonts.bunny.net" />
	<link href="https://fonts.bunny.net/css?family=inter:500|space-grotesk:500" rel="stylesheet" />
	<title>Corbado Passkey demo</title>
	<meta name="description" content="Corbado Passkey passwordless authentication demo" />
</svelte:head>
```

## Setting up the Corbado web component for authentication

Our demo page contains various sections as defined in our `+page.svelte` file:

```html
<script lang="ts">
	import Footer from '$lib/sections/Footer.svelte';
	import PasskeyDemo from '$lib/sections/PasskeyDemo.svelte';
	import PasskeyExplainer from '$lib/sections/PasskeyExplainer.svelte';
	import PasskeySaas from '$lib/sections/PasskeySaas.svelte';
	import PasskeyStats from '$lib/sections/PasskeyStats.svelte';
	import PasskeyTimeline from '$lib/sections/PasskeyTimeline.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
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

<footer />
```

For the purpose of this demo, we'll focus on integrating corbado, so I am going to omit on how I styled and built those pages. If you're interested, checkout the `src/lib/sections` and `src/lib/components` folder in the project repository to see how they're styled.

### Setting up your Corbado account and project

Visit the [Corbado Developer Panel](https://app.corbado.com) to sign up and create your account (you'll see passkeys sign up in action!).
Once you are in the Developerpanel, go to Settings > Credentials:

![[CleanShot 2023-04-11 at 12.24.09@2x.png]]

Here, add a new authorized origin so that your local Svelte app can send requests to the Corbado API using the web component:

![[CleanShot 2023-04-11 at 12.25.04@2x.png]]

![[CleanShot 2023-04-11 at 12.26.10@2x.png]]

Once you are done, you will need to get your project ID and create an API secret to authenticate with the Corbado backend:

![[CleanShot 2023-04-11 at 12.26.55@2x.png]]

Copy the username by clicking on it, and press on add new to get a new API secret you can copy. We'll add these to an `.env` file in the root of our SvelteKit project:

```sh
CORBADO_API_SECRET=****
PUBLIC_CORBADO_PROJECT_ID=***
```

SvelteKit allows us to easily access these using the $env namespace to import them. Env variables with `PUBLIC_` prefix are accessible in both client and server routes, while ones without default to being secret and are only accessible in SvelteKit server routes.

### Including the web component in our frontend

The first section in our root `+page.svelte` is `PasskeysDemo`. This section contains our web component demo. To import the corbado web component into our app, all we need to do is add a `svelte:head` to load the script in `src/lib/sections/PasskeyDemo.svelte`:

```html
<svelte:head>
	<script defer src="https://auth.corbado.com/auth.js"></script>
</svelte:head>
```

Then we can include it like so:

```html
<corbado-auth
	style="border: none"
	project_id="{PUBLIC_CORBADO_PROJECT_ID}"
	conditional="yes"
	login_title="Try passkey login"
	login_btn="Passkey login"
	register_title="Try passkey signup"
	register_btn="Passkey signup"
	page="register"
>
	<input name="username" id="corbado-username" value="" required autocomplete="webauthn" />
</corbado-auth>
```

The component has various utility attributes to customize it, like `login_title`, or `login_btn`. What's important for you to get it to work is the `project_id` attribute, where we will pass in our `PUBLIC_CORBADO_PROJECT_ID` from the environment. If you use an Editor like VSCode with the Svelte extension, it will automatically add this import to your `.svelte` `<script>` tag:

```js
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
```

## Setting up the redirect logic

The Corbado web component works by _redirecting_ you to a page you specify once the user signs up or logs in. This redirect URL can be a server-side route, or a client route. In our case, it will be a SvelteKit server endpoint. To set up our Redirect URL, let's go into the [Corbado Developer Panel](https://app.corbado.com) and navigate to the URL tab in Settings > General:

![[CleanShot 2023-04-11 at 12.54.37@2x.png]]

![[CleanShot 2023-04-11 at 12.54.42@2x.png]]

Here, we'll enter the api route of our SvelteKit that we want to receive the redirect on, and add our localhost address as our application URL.

![[CleanShot 2023-04-11 at 13.04.18@2x.png]]

Let's now add our server route in SvelteKit. Under the `routes/` folder, we will create the folders `api/register` and create a file `api/register/+server.ts` in it. This will contain our API route:

```ts
import { CORBADO_API_SECRET } from '$env/static/private';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ url, request, getClientAddress, cookies }) => {
	const corbado = {
		sessionToken: url.searchParams.get('sessionToken') || '',
		userAgent: request.headers.get('user-agent'),
		remoteAddress: getClientAddress()
	};

	const response = await fetch('https://api.corbado.com/v1/sessions/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${btoa(`${PUBLIC_CORBADO_PROJECT_ID}:${CORBADO_API_SECRET}`)}`
		},
		body: JSON.stringify({
			token: corbado.sessionToken,
			clientInfo: {
				userAgent: corbado.userAgent,
				remoteAddress: corbado.remoteAddress
			}
		})
	});

	if (response.status !== 200) {
		throw error(401, 'Invalid session token');
	}

	cookies.set('jwt', crypto.randomUUID(), {
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24 // 1 day
	});

	throw redirect(303, '/');
}) satisfies RequestHandler;
```

Let's digest this one by one. This `GET` route will be automatically called by the Corbado API once a user clicks on register or login. We then need to verify that information with the Corbado API, and can then authenticate our user locally.

In the `corbado` constant, we save all the information that is relevant to verification, such as `corbadoSessionToken`, the `userAgent` and the `remoteAddress`. SvelteKit provides useful helpers we can pass to the route to get all this information.

Once we have that information, we want to call the Corbado API's `sessionVerify` endpoint. We use our project ID and our secret that we saved in our `.env` before to authenticate with Basic authentication, and in the body, we pass the sessionToken, and the client info we have gathered.

If our response fails, we will let our endpoint throw an error. If we successfully verified, we can now set a cookie using a new `jwt` token, and redirect our client back to the root. Note that in production, you would probably use the user information returned to you by the response of the `sessionVerify` call to create a user in your database, but for our purpose, we'll just create a cookie locally.

## Using cookies to manage authentication state

Now that we can press sign up on our component and get a cookie back, we need to load that cookie into our client and use it to show sign in status. To do this, we can use SvelteKit's `load` functions. In our `routes` folder root, we can create a `+page.server.ts` next to the existing `+page.server.ts`:

```ts
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt = cookies.get('jwt');

	return {
		jwt
	};
}) satisfies PageServerLoad;
```

What this does is get the jwt cookie that we set in the redirect, and pass it down to all pages in the same level of `routes` or below.

Earlier, in our root `+page.svelte`, you might have noticed that there was an additional variable in our script:

```ts
export let data: PageData;
```

This data is populated with whatever the `load` function of our page returns, in this case the content of our jwt cookie. We want to pass this cookie down into our `PasskeyDemo` section:

```html
<PasskeyDemo {data} />
```

In that section, we also need to declare the `data` prop to receive it from the parent page. This should be in our script section:

```ts
export let data: PageData;
```

Now we can use that to conditionally render our UI:

```html
<!--- other code --->
{#if data && data.jwt}
<Card class="w-full">
	<Heading tag="h4">That’s it. You’re logged in.​</Heading>
	<button href="/api/logout" pill class="bg-primary text-white mt-32 mb-8">Log out</button>
</Card>
{:else}
<Card class="w-full">
	<corbado-auth
		style="border: none"
		project_id="{PUBLIC_CORBADO_PROJECT_ID}"
		conditional="yes"
		login_title="Try passkey login"
		login_btn="Passkey login"
		register_title="Try passkey signup"
		register_btn="Passkey signup"
		page="register"
	>
		<input name="username" id="corbado-username" value="" required autocomplete="webauthn" />
	</corbado-auth>
</Card>
{/if}
<!--- other code --->
```

This will render either our web component if we are not logged in, or a log out button if we are already logged in. The Logout button uses another action. We can create that action by simply creating a file `api/logout/+server.ts` with the following content:

```ts
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (({ cookies }) => {
	cookies.set('jwt', '', {
		path: '/',
		expires: new Date(0)
	});

	throw redirect(303, '/');
}) satisfies RequestHandler;
```

This action will get invoked when the button is pressed, and it will delete the jwt token from the browser and redirect back to the page root.

## Conclusion

I hope this demo showed how easy it is to quickly add authentication to your SvelteKit app by using Corbado for authentication, and utilizing all of SvelteKit's features to make our lives easier in the process.
