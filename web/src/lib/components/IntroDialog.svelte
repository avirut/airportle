<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { cn } from '$lib/utils.js';

	let { open, onClose }: { open: boolean; onClose: () => void } = $props();

	const tileExamples = [
		{
			letter: 'A',
			tone: 'border-emerald-500 bg-emerald-500 text-white',
			text: 'Correct letter in the correct position.'
		},
		{
			letter: 'T',
			tone: 'border-amber-400 bg-amber-400 text-zinc-950',
			text: 'Correct letter, but it belongs somewhere else.'
		},
		{
			letter: 'L',
			tone: 'border-border bg-muted text-foreground',
			text: "Letter is not in today's airport code."
		}
	];

	const modes = [
		{
			name: 'Letters',
			description: 'Wordle-style letter feedback only.'
		},
		{
			name: 'Both',
			description: 'Letter feedback plus distance and direction hints.'
		},
		{
			name: 'Distance',
			description: 'Keep tiles neutral and solve from geography alone.'
		}
	];
</script>

<Dialog.Root
	{open}
	onOpenChange={(isOpen) => {
		if (!isOpen) onClose();
	}}
>
	<Dialog.Content class="max-w-xl border border-border/70 bg-card p-0 shadow-2xl">
		<div class="space-y-6 p-6 sm:p-7">
			<Dialog.Header class="space-y-2 pr-8">
				<p class="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
					How to play
				</p>
				<Dialog.Title class="text-2xl font-semibold tracking-tight">
					Guess the airport code in six tries.
				</Dialog.Title>
				<Dialog.Description class="text-base leading-relaxed text-muted-foreground">
					Each guess is a valid three-letter IATA airport code. Use the feedback mode you like best
					and narrow in on today's answer.
				</Dialog.Description>
			</Dialog.Header>

			<section class="space-y-3">
				<h3 class="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
					Read the tiles
				</h3>
				<div class="grid gap-3">
					{#each tileExamples as example}
						<div
							class="flex items-center gap-3 rounded-3xl border border-border/70 bg-muted/30 p-3"
						>
							<div
								class={cn(
									'flex h-11 w-11 items-center justify-center rounded-2xl border text-lg font-semibold uppercase shadow-sm',
									example.tone
								)}
							>
								{example.letter}
							</div>
							<p class="text-sm text-foreground">{example.text}</p>
						</div>
					{/each}
				</div>
			</section>

			<section class="space-y-3">
				<h3 class="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
					Choose a mode
				</h3>
				<div class="grid gap-3 sm:grid-cols-3">
					{#each modes as mode}
						<div class="rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm">
							<p class="font-semibold">{mode.name}</p>
							<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
								{mode.description}
							</p>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<Dialog.Footer class="border-t border-border/70 bg-muted/20 px-6 py-4 sm:px-7">
			<Button class="w-full sm:w-auto" onclick={onClose}>Start guessing</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
