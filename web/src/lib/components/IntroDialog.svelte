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
			tone: 'border-amber-400 bg-amber-400 text-white',
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
	<Dialog.Content class="flex max-h-[85dvh] max-w-[85vw] flex-col gap-0 overflow-hidden border border-border/70 bg-card p-0 shadow-2xl sm:max-w-md">
		<div class="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
			<Dialog.Header class="space-y-1 pr-8">
				<p class="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
					How to play
				</p>
				<Dialog.Title class="text-lg font-semibold tracking-tight">
					Guess the airport code in six tries.
				</Dialog.Title>
				<Dialog.Description class="text-sm leading-snug text-muted-foreground">
					Each guess is a valid three-letter IATA airport code. Use the feedback mode you like
					best and narrow in on today's answer.
				</Dialog.Description>
			</Dialog.Header>

			<section class="space-y-2">
				<h3 class="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
					Read the tiles
				</h3>
				<div class="grid gap-2">
					{#each tileExamples as example}
						<div class="flex items-center gap-2.5 rounded-xl border border-border/70 bg-muted/30 p-2">
							<div
								class={cn(
									'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold uppercase shadow-sm',
									example.tone
								)}
							>
								{example.letter}
							</div>
							<p class="text-xs leading-snug text-foreground">{example.text}</p>
						</div>
					{/each}
				</div>
			</section>

			<section class="space-y-2">
				<h3 class="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
					Choose a mode
				</h3>
				<div class="grid gap-2 sm:grid-cols-3">
					{#each modes as mode}
						<div class="rounded-xl border border-border/70 bg-background/80 p-3 shadow-sm">
							<p class="text-sm font-semibold">{mode.name}</p>
							<p class="mt-0.5 text-xs leading-snug text-muted-foreground">
								{mode.description}
							</p>
						</div>
					{/each}
				</div>
			</section>

			<p class="pt-1 text-center text-xs text-muted-foreground/60">
				inspired by all the -dles, -tles and airportles that came before
			</p>
		</div>

		<Dialog.Footer class="border-t border-border/70 bg-muted/20 px-4 py-3 sm:px-5">
			<Button class="w-full sm:w-auto" onclick={onClose}>Start guessing</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
