<script lang="ts">
	import { game } from '$lib/game.svelte.js';
	import { cn } from '$lib/utils.js';

	const airport = $derived(game.status !== 'playing' ? game.airports[game.targetCode] : null);
</script>

{#if game.status !== 'playing' && airport}
	<div
		class={cn(
			'w-full max-w-md rounded-xl border px-5 py-3 text-center shadow-sm',
			game.status === 'won'
				? 'border-emerald-500/30 bg-emerald-500/10'
				: 'border-rose-500/30 bg-rose-500/10'
		)}
	>
		{#if game.status === 'won'}
			<p class="text-lg font-semibold">You got it!</p>
		{:else}
			<p class="text-lg font-semibold">
				The answer was <span class="font-mono">{game.targetCode}</span>
			</p>
		{/if}
		<p class="mt-0.5 text-sm text-muted-foreground">
			{airport.name} · {airport.city}, {airport.country}
		</p>
	</div>
{/if}
