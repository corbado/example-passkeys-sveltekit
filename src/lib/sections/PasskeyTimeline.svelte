<script lang="ts">
	import { A, Heading, P, Timeline, TimelineItem } from 'flowbite-svelte';
	const timelineItems = [
		{
			title: 'Microsoft',
			date: 'May 2022',
			text: 'announces passkeys on world password day'
		},
		{
			title: 'Google',
			date: 'May 2022',
			text: 'announces passkeys at Google I/O'
		},
		{
			title: 'Apple',
			date: 'June 2022',
			text: 'announces passkeys at WWDC22'
		},
		{
			title: 'You?',
			date: 'NOW',
			text: 'When do you follow?'
		}
	];
</script>

<section class="bg-white">
	<div
		class="flex flex-col justify-between gap-2 py-8 px-4 mx-auto max-w-screen-xl lg:py-32 lg:px-12 lg:flex-row"
	>
		<div class="w-full text-center">
			<Heading tag="h2" class="mb-32">Stand on the shoulder of giants.</Heading>
			<Timeline order="horizontal">
				{#each timelineItems as timelineItem}
					<TimelineItem title={timelineItem.title} date={timelineItem.date}>
						<svelte:fragment slot="icon">
							<div class="flex items-center">
								<div
									class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
								>
									<svg
										aria-hidden="true"
										class="w-3 h-3 text-blue-600 dark:text-blue-300"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
											clip-rule="evenodd"
										/></svg
									>
								</div>
								<div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
							</div>
						</svelte:fragment>
						<p class="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
							{timelineItem.text}
						</p>
					</TimelineItem>
				{/each}
			</Timeline>
			<P class="mt-16 text-base font-normal text-gray-500 dark:text-gray-400 px-4 lg:w-1/2 mx-auto">
				The three digital leaders -
				<A href="https://apple.com" target="_blank">Apple</A>,
				<A href="https://google.com" target="_blank">Google</A>,
				<A href="https://microsoft.com" target="_blank">Microsoft</A> - have all announced their full
				support for passkeys in their operating systems, devices and browsers, enforcing passkeys as
				new login standard. Passkeys are based on FIDO2 and WebAuthn, a capability of operating systems
				that enables devices to authenticate against a website or app. ​</P
			>
		</div>
	</div>
</section>
