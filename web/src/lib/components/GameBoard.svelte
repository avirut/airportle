<script lang="ts">
	import { game } from '$lib/game.svelte.js';
	import GuessRow from './GuessRow.svelte';
</script>

<section class="flex w-full flex-col items-center gap-2.5" aria-label="Guess grid">
	{#each { length: 6 } as _, i}
		{@const guess = game.guesses[i]}
		{@const isActive = i === game.guesses.length && game.status === 'playing'}
		<GuessRow
			letters={isActive ? game.currentInput : (guess?.code ?? '')}
			results={guess?.letters ?? null}
			distanceKm={guess?.distanceKm ?? null}
			direction={guess?.direction ?? null}
			bearingDeg={guess?.bearingDeg ?? null}
			mode={game.mode}
			{isActive}
			shake={isActive && game.shakeActive}
		/>
	{/each}
</section>
