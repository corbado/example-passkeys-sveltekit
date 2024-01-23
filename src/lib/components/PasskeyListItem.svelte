<script lang="ts">
	import type Passkey from './passkey';
	// @ts-ignore
	import { UAParser } from 'ua-parser-js';

	export let passkey: Passkey;

	function parseUserAgent(uaString: string): string {
		const parser = new UAParser(uaString);
		const browserName = parser.getBrowser().name;
		const osName = parser.getOS().name;

		return `${browserName} on ${osName}`;
	}
</script>

<div class="border rounded-xl border-2 p-4 flex flex-col md:flex-row gap-3 items-center">
	<div class="w-[60px] h-[60px] grow-0 shrink-0">
		<img src="/passkey_icon.svg" alt="passkey icon" class="object-cover" />
	</div>
	<div class="grow">
		<div class="flex gap-3 items-center mb-3">
			<h2 class="text-xl">Passkey</h2>
			{#if passkey.backupState}
				<p class="text-sm border p-1 rounded border-2 border-slate-500">Synced</p>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<p>Credential ID: {passkey.aaguid}</p>
			<p>Created: {passkey.created} with {parseUserAgent(passkey.userAgent)}</p>
			<p>Last used: {passkey.lastUsed}</p>
			<p>Status: {passkey.status ? 'active' : 'inactive'}</p>
		</div>
	</div>
</div>
