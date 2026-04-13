<script lang="ts">
	import { game } from '$lib/game.svelte.js';
	import { setGameMode } from '$lib/storage.js';
	import type { GameMode } from '$lib/types.js';

	const modes: { value: GameMode; label: string }[] = [
		{ value: 'letters', label: 'Letters' },
		{ value: 'both', label: 'Both' },
		{ value: 'distance', label: 'Distance' }
	];

	function select(mode: GameMode) {
		game.setMode(mode);
		setGameMode(mode);
	}
</script>

<div
	class="inline-flex items-center rounded-full border border-border p-0.5"
	role="radiogroup"
	aria-label="Game mode"
>
	{#each modes as mode}
		{#if game.mode === mode.value}
			<button
				type="button"
				role="radio"
				aria-checked="true"
				onclick={() => select(mode.value)}
				class="rounded-full bg-input px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
			>
				{mode.label}
			</button>
		{:else}
			<button
				type="button"
				role="radio"
				aria-checked="false"
				onclick={() => select(mode.value)}
				class="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
			>
				{mode.label}
			</button>
		{/if}
	{/each}
</div>
