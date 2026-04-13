<script lang="ts">
	import { Delete } from '@lucide/svelte';
	import { game } from '$lib/game.svelte.js';
	import type { TileState } from '$lib/types.js';
	import { cn } from '$lib/utils.js';

	const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

	const KEY_TONES: Record<TileState, string> = {
		correct: 'border-emerald-500 bg-emerald-500 text-white',
		present: 'border-amber-400 bg-amber-400 text-white',
		absent: 'border-border bg-muted text-muted-foreground',
		empty: 'border-border bg-card text-foreground hover:bg-muted/70'
	};

	function keyClass(letter: string): string {
		if (game.mode === 'distance') return KEY_TONES.empty;
		const state = game.keyColors[letter] ?? 'empty';
		return KEY_TONES[state];
	}
</script>

<section class="flex w-full max-w-md flex-col items-center gap-1.5">
	{#each ROWS as row, rowIdx}
		<div class="flex gap-1.5">
			{#if rowIdx === 2}
				<button
					type="button"
					onclick={() => game.submitGuess()}
					class="flex h-12 items-center justify-center rounded-lg border border-border bg-card px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted active:translate-y-px sm:h-14"
				>
					Enter
				</button>
			{/if}

			{#each row.split('') as letter}
				<button
					type="button"
					onclick={() => game.addLetter(letter)}
					class={cn(
						'flex h-12 w-8 items-center justify-center rounded-lg border text-sm font-semibold uppercase transition-colors active:translate-y-px sm:h-14 sm:w-10',
						keyClass(letter)
					)}
				>
					{letter}
				</button>
			{/each}

			{#if rowIdx === 2}
				<button
					type="button"
					onclick={() => game.deleteLetter()}
					aria-label="Delete"
					class="flex h-12 items-center justify-center rounded-lg border border-border bg-card px-3 text-foreground transition-colors hover:bg-muted active:translate-y-px sm:h-14"
				>
					<Delete size={16} />
				</button>
			{/if}
		</div>
	{/each}

	{#if game.invalidCode}
		<p class="mt-2 text-sm font-medium text-destructive">Not a valid IATA code</p>
	{/if}
</section>
