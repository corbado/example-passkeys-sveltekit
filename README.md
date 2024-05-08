# Svelte Passkey-First Authentication Example with Corbado

This is a sample implementation of the Corbado UI component and Node SDK being integrated into a web application built
with Sveltekit.

Please see the [full blog post](https://www.corbado.com/blog/sveltekit-passkeys) to understand the detailed steps needed to
integrate passkeys into Svelte apps.

## File structure

- `src/routes/+page.svelte`: component for the sign up / login screen
- `src/routes/profile/+page.server.ts`: Used to load user information on the server side
- `src/routes/profile/+page.svelte`: component for the user profile information that is shown after successful
  authentication
- `src/routes/+layout.server.ts`: file to switch SSR off (we're working on SSR support already)
- `.env`: add Corbado project ID and project secret as environment variables that you can obtain
  from the [Corbado developer panel](https://app.corbado.com/signin#register)

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in the [Corbado developer panel](https://app.corbado.com/signin#register).

You need to have [Node](https://nodejs.org/en/download) and `npm` installed to run it.

## Usage

Run

```bash
npm i
```

to install all dependencies.

Finally, you can run the project locally with

```bash
npm run dev
```
