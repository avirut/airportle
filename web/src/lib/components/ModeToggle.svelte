<script lang="ts">
	import { game } from '$lib/game.svelte.js';
	import { setGameMode } from '$lib/storage.js';
	import type { GameMode } from '$lib/types.js';
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group/index.js';

	const modes: { value: GameMode; label: string }[] = [
		{ value: 'letters', label: 'Letters' },
		{ value: 'both', label: 'Both' },
		{ value: 'distance', label: 'Distance' }
	];

	function handleChange(value: string | undefined) {
		if (!value) return;
		game.setMode(value as GameMode);
		setGameMode(value as GameMode);
	}
</script>

<ToggleGroup
	type="single"
	size="sm"
	variant="outline"
	value={game.mode}
	onValueChange={handleChange}
>
	{#each modes as mode}
		<ToggleGroupItem
			value={mode.value}
			aria-label="{mode.label} mode"
			class="data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:hover:bg-foreground/90"
		>
			{mode.label}
		</ToggleGroupItem>
	{/each}
</ToggleGroup>
