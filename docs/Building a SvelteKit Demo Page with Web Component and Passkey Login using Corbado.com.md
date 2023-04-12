- [1. Introduction](#1-introduction)
- [2. Setting up the SvelteKit project](#2-setting-up-the-sveltekit-project)
- [3. Setting up fonts and global styles using Tailwind](#3-setting-up-fonts-and-global-styles-using-tailwind)
- [4. Repository structure](#4-repository-structure)
- [5. Setting up the Corbado web component for passkey authentication](#5-setting-up-the-corbado-web-component-for-passkey-authentication)
  - [5.1 Setting up your Corbado account and project](#51-setting-up-your-corbado-account-and-project)
  - [5.2 Including the web component in our frontend](#52-including-the-web-component-in-our-frontend)
  - [5.3 Setting up the redirect logic](#53-setting-up-the-redirect-logic)
  - [5.4 Using cookies to manage authentication state](#54-using-cookies-to-manage-authentication-state)
- [6. Conclusion](#6-conclusion)

## 1. Introduction

In this blog post, we'll be walking through the process of building a demo page for [passkeys.eu](https://passkeys.eu/) using SvelteKit. We'll cover how to create a reusable web component and implement passkey login functionality for a seamless user experience. This tutorial assumes basic familiarity with SvelteKit, HTML, CSS and JavaScript. Let's dive in!

## 2. Setting up the SvelteKit project

We'll follow along by cloning our [demo repository](https://github.com/Corbado/passkeys-demo) with the finished code, but in case you are interested in how you'd set up the skeleton of the project, check out the next 2 sections. Otherwise, you can skip them and continue from [repository structure](#repository-structure).

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

Then, we'll have to install TailwindCSS:

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

## 3. Setting up fonts and global styles using Tailwind

To set up some standard fonts and styles that should be global for our application, we can use Tailwind theming. First, we'll create a `<svelte:head>` section in our root `+page.svelte`. This behaves like a standard HTML `<head>` you'd find in the `index.html` file, it contains metadata and allows you to include third party scripts. We are going to use it to include some fonts from [Bunny Fonts](https://fonts.bunny.net/) and add some metadata for SEO. Add this to your `+page.svelte`:

```html
<svelte:head>
	<link rel="preconnect" href="https://fonts.bunny.net" />
	<link href="https://fonts.bunny.net/css?family=inter:500|space-grotesk:500" rel="stylesheet" />
	<title>Passkeys demo</title>
	<meta name="description" content="Corbado Passkey passwordless authentication demo" />
</svelte:head>
```

## 4. Repository structure

Let's first discuss the structure of our `src` folder:

```sh
├── lib
│  ├── assets
│  │  ├── apple.svg
│  │  ├── auth-sample.svg
│  │  ├── Corbado.png
│  │  ├── devices.svg
│  │  ├── europe.png
│  │  ├── github.png
│  │  ├── google.svg
│  │  ├── microsoft.svg
│  │  ├── slack.webp
│  │  └── twitter.png
│  ├── components
│  │  ├── CheckItem.svelte
│  │  └── InfoCard.svelte
│  └── sections
│     ├── Footer.svelte
│     ├── PasskeyDemo.svelte
│     ├── PasskeyExplainer.svelte
│     ├── PasskeySaas.svelte
│     ├── PasskeyStats.svelte
│     └── PasskeyTimeline.svelte
├── routes
│  ├── api
│  │  ├── logout
│  │  │  └── +server.ts
│  │  └── register
│  │     └── +server.ts
│  ├── +layout.svelte
│  ├── +page.server.ts
│  └── +page.svelte
├── app.d.ts
├── app.html
└── app.postcss
 static
└── favicon.png
```

- `lib` contains auxiliary files, such as:

  - image `assets`
  - custom `components` we made
  - `sections` that we use on our demo page

- `routes` contains all the routes of our app, such as
  - `api` routes, these are equivalent to API endpoints you would have in a classic server / backend. The path of the endpoints correspond to their folder path.
  - The root path `/` svelte files:
    - `+layout.svelte` defines the overall layout and applies our global `.postcss`
    - `+page.server.ts` handles server-side logic for that particular route (`/` in this case), such as load functions or form actions.
    - `+page.svelte` contains the actual client-side code to render our page

We have a root `.html` and `.css` file, which we can ignore for the purpose of our tutorial. And a `static` folder for assets like favicons.

## 5. Setting up the Corbado web component for passkey authentication

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

For the purpose of this demo, we'll focus on integrating Corbado, so I am going to omit on how I styled and built those pages. If you're interested, checkout the `src/lib/sections` and `src/lib/components` folder in the project repository to see how they're styled.

### 5.1 Setting up your Corbado account and project

Visit the [Corbado Developer Panel](https://app.corbado.com/signin#register) to sign up and create your account (you'll see passkeys sign up in action!).
Once you are in the developer panel, go to Settings > Credentials:

- Press on `Add New`.

Here, add a new authorized origin so that your local Svelte app can send requests to the Corbado API using the web component:

- Enter a name description, e.g. "Passkey demo"
- Enter the origin URL, in our case the `http://localhost:5137` local url

Once you are done, you will need to get your project ID and create an API secret to authenticate with the Corbado backend. Go to the `API secrets` tab.

Copy the username by clicking on it, and press on add new to get a new API secret you can copy. We'll add these to an `.env` file in the root of our SvelteKit project:

```sh
CORBADO_API_SECRET=****
PUBLIC_CORBADO_PROJECT_ID=***
```

SvelteKit allows us to easily access these using the $env namespace to import them. Env variables with `PUBLIC_` prefix are accessible in both client and server routes, while ones without default to being secret and are only accessible in SvelteKit server routes.

### 5.2 Including the web component in our frontend

The first section in our root `+page.svelte` is `PasskeysDemo`. This section contains our web component demo. To import the Corbado web component into our app, all we need to do is add a `svelte:head` to load the script in `src/lib/sections/PasskeyDemo.svelte`:

```html
<svelte:head>
	<script defer src="https://auth.Corbado.com/auth.js"></script>
</svelte:head>
```

Then we can include it:

```html
<Corbado-auth
	style="border: none"
	project_id="{PUBLIC_CORBADO_PROJECT_ID}"
	conditional="yes"
	login_title="Try passkey login"
	login_btn="Passkey login"
	register_title="Try passkey signup"
	register_btn="Passkey signup"
	page="register"
>
	<input name="username" id="Corbado-username" value="" required autocomplete="webauthn" />
</Corbado-auth>
```

The web component has various utility attributes to customize it, like `login_title`, or `login_btn`. What's important for you to get it to work is the `project_id` attribute, where we will pass in our `PUBLIC_CORBADO_PROJECT_ID` from the environment. If you use an Editor like VSCode with the Svelte extension, it will automatically add this import to your `.svelte` `<script>` tag:

```js
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
```

### 5.3 Setting up the redirect logic

The Corbado web component works by _redirecting_ you to a page you specify once the user signs up or logs in. This redirect URL can be a server-side route, or a client route. In our case, it will be a SvelteKit server endpoint. To set up our Redirect URL, let's go into the [Corbado Developer Panel](https://app.Corbado.com) and navigate to the URL tab in Settings > General and enter the following:

`Redirect URL`: Enter the URL your app should redirect to once signing up with the web component. In our case, it is the SvelteKit API route `http://localhost:5137/api/register` .

`Application URL`: Enter the URL your application runs on, in our case it is `localhost:5137` locally.

The Application URL is used for, among others, to correctly direct users to the web component again, when they have clicked on an email magic link.

Let's now add our server route in SvelteKit. Under the `routes/` folder, we will create the folders `api/register` and create a file `api/register/+server.ts` in it. This will contain our API route:

```ts
import { CORBADO_API_SECRET } from '$env/static/private';
import { PUBLIC_CORBADO_PROJECT_ID } from '$env/static/public';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ url, request, getClientAddress, cookies }) => {
	const Corbado = {
		sessionToken: url.searchParams.get('sessionToken') || '',
		userAgent: request.headers.get('user-agent'),
		remoteAddress: getClientAddress()
	};

	const response = await fetch('https://api.Corbado.com/v1/sessions/verify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${btoa(`${PUBLIC_CORBADO_PROJECT_ID}:${CORBADO_API_SECRET}`)}`
		},
		body: JSON.stringify({
			token: Corbado.sessionToken,
			clientInfo: {
				userAgent: Corbado.userAgent,
				remoteAddress: Corbado.remoteAddress
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

In the `Corbado` constant, we save all the information that is relevant to verification, such as `sessionToken`, and `clientinfo` such as the `userAgent` and the `remoteAddress`. SvelteKit provides useful helpers we can pass to the route to get all this information.

Once we have that information, we want to call the Corbado API's `sessionVerify` endpoint. We use our project ID and our secret that we saved in our `.env` before to authenticate with Basic authentication, and in the body, we pass the sessionToken, and the `clientinfo` we have gathered.

If our response fails, we will let our endpoint throw an error. If we successfully verified, we can now set a cookie using a new `jwt` token, and redirect our client back to the root. Note that in production, you would probably use the user information returned to you by the response of the `sessionVerify` call to create a user in your database, but for our purpose, we'll just create a cookie locally.

### 5.4 Using cookies to manage authentication state

Now that we can press sign up on our web component and get a cookie back, we need to load that cookie into our client and use it to show sign in status. To do this, we can use SvelteKit's `load` functions. In our `routes` folder root, we can create a `+page.server.ts` next to the existing `+page.server.ts`:

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
	<Corbado-auth
		style="border: none"
		project_id="{PUBLIC_CORBADO_PROJECT_ID}"
		conditional="yes"
		login_title="Try passkey login"
		login_btn="Passkey login"
		register_title="Try passkey signup"
		register_btn="Passkey signup"
		page="register"
	>
		<input name="username" id="Corbado-username" value="" required autocomplete="webauthn" />
	</Corbado-auth>
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

## 6. Conclusion

I hope this demo showed how easy it is to quickly add passwordless authentication using passkeys to your SvelteKit app by using Corbado, and utilizing all of SvelteKit's features to make our lives easier in the process.
