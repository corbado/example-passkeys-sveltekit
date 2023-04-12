# Complete passkeys integration example for Corbado API with SvelteKit

This is a sample implementation of the Corbado webcomponent being integrated into a web page built with SvelteKit to showcase passkey authentication. You can see the demo live on <https://passkeys.eu> or <https://passkeys.fr>.

## File structure

- `src/lib` contains reusable files such as `assets`, `components` or `sections` used in the app
- `routes` contains the pages for the app
  - `routes/api` contains the server-side api routes for the app

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure a project in our [developer panel](https://app.corbado.com).

You need to have [Node](https://nodejs.org/en/download) and `pnpm` installed to run it. Run

```bash
npm i -g pnpm
```

to install pnpm once you have node set up.

### Configure environment variables

Use the values you obtained in [Prerequisites](#prerequisites) to configure the following variables inside an `.env` file you create in the root folder of this project:

```sh
CORBADO_API_SECRET=<YOUR SECRET>
PUBLIC_CORBADO_PROJECT_ID=<YOUR PROJECT ID>
```

## Usage

Run

```bash
pnpm i
```

to install all dependencies.

Finally, you can run the project locally with

```bash
pnpm run dev
```

This will start the SvelteKit app on `localhost:5173` by default.
