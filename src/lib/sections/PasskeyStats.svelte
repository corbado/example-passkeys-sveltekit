<script lang="ts">
	import InfoCard from '$lib/components/InfoCard.svelte';
	import { Heading, P } from 'flowbite-svelte';
</script>

<section class="bg-secondary">
	<div
		class="flex flex-col justify-between items-center gap-2 py-8 px-4 mx-auto max-w-screen-xl md:py-8 md:px-12 md:flex-row"
	>
		<div class="w-full text-center md:text-start">
			<Heading tag="h6" class="text-info mb-4">IMPROVE UX WHILE BOOSTING SECURITY</Heading>
			<Heading tag="h2" class="mb-8">Why passkeys?</Heading>
			<P class="mb-8 text-center md:text-start">
				Stand out as a user- & privacy-driven company. Transition your users from passwords to
				passkeys.
			</P>
		</div>
		<div class="flex flex-col md:flex-row gap-y-4 text-center items-center justify-evenly w-full">
			<div>
				<InfoCard
					title="Improve UX"
					reason="because"
					stat="75%"
					statReason="frustrated due to passwords"
				>
					<svelte:fragment slot="icon">
						<path
							fill-rule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
							clip-rule="evenodd"
						/>
					</svelte:fragment>
				</InfoCard>
			</div>
			<div class="flex flex-col gap-y-2">
				<InfoCard
					title="Increase profitability"
					reason="with a "
					stat="33%"
					statReason="increased conversion rate"
				>
					<svelte:fragment slot="icon">
						<path
							fill-rule="evenodd"
							d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z"
							clip-rule="evenodd"
						/>
					</svelte:fragment>
				</InfoCard>
				<InfoCard
					title="Enhance IT security"
					reason="with"
					stat="100%"
					statReason="phishing-resistance"
				>
					<svelte:fragment slot="icon">
						<path
							fill-rule="evenodd"
							d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
							clip-rule="evenodd"
						/>
					</svelte:fragment>
				</InfoCard>
			</div>
		</div>
	</div>
</section>
