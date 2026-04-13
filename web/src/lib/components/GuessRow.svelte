<script lang="ts">
	import { ArrowUp, Check } from '@lucide/svelte';
	import type { CompassDir, GameMode, LetterResult } from '$lib/types.js';
	import { cn } from '$lib/utils.js';

	let {
		letters,
		results,
		distanceKm,
		direction,
		bearingDeg,
		mode,
		isActive,
		shake = false
	}: {
		letters: string;
		results: LetterResult[] | null;
		distanceKm: number | null;
		direction: CompassDir | null;
		bearingDeg: number | null;
		mode: GameMode;
		isActive: boolean;
		shake?: boolean;
	} = $props();

	const showLetterFeedback = $derived(mode !== 'distance');
	const showDistanceColumn = $derived(mode !== 'letters');
	const showDistance = $derived(showDistanceColumn && distanceKm !== null);


	function letterAt(index: number): string {
		if (results) return results[index].letter;
		return letters[index] ?? '';
	}

	function tileTone(index: number): string {
		const state = showLetterFeedback ? results?.[index]?.state : null;
		const filled = !!letterAt(index);

		if (state === 'correct') return 'border-emerald-500 bg-emerald-500 text-white shadow-sm';
		if (state === 'present') return 'border-amber-400 bg-amber-400 text-white shadow-sm';
		if (state === 'absent') return 'border-border bg-muted text-muted-foreground';
		if (isActive && filled) return 'border-primary/40 bg-card text-foreground';
		return 'border-border bg-card text-foreground';
	}

	function directionLabel(value: CompassDir | null): string {
		return value ?? 'Here';
	}
</script>

<div class={cn('flex justify-center', shake && 'animate-[shake_0.5s_ease-in-out]')}>
	{#if showDistanceColumn}
		<div class="inline-grid grid-cols-[auto_minmax(8.5rem,9.5rem)] items-center gap-3">
			<div class="flex gap-2">
				{#each [0, 1, 2] as index}
					<div
						class={cn(
							'flex h-14 w-14 items-center justify-center rounded-xl border text-2xl font-semibold uppercase transition-colors sm:h-16 sm:w-16 sm:text-[2rem]',
							tileTone(index)
						)}
					>
						{letterAt(index)}
					</div>
				{/each}
			</div>

			<div
				class={cn(
					'flex h-12 items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 text-sm text-muted-foreground shadow-sm',
					showDistance ? 'opacity-100' : 'opacity-0'
				)}
				aria-hidden={!showDistance}
			>
				<div class="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground">
					{#if direction}
						<ArrowUp size={14} style={`transform: rotate(${bearingDeg ?? 0}deg)`} />
					{:else}
						<Check size={14} />
					{/if}
				</div>
				<div class="min-w-0">
					<p class="font-medium text-foreground">{directionLabel(direction)}</p>
					<p class="truncate text-xs text-muted-foreground">
						{Math.round(distanceKm ?? 0).toLocaleString()} mi away
					</p>
				</div>
			</div>
		</div>
	{:else}
		<div class="flex gap-2">
			{#each [0, 1, 2] as index}
				<div
					class={cn(
						'flex h-14 w-14 items-center justify-center rounded-xl border text-2xl font-semibold uppercase transition-colors sm:h-16 sm:w-16 sm:text-[2rem]',
						tileTone(index)
					)}
				>
					{letterAt(index)}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		20% {
			transform: translateX(-6px);
		}
		40% {
			transform: translateX(6px);
		}
		60% {
			transform: translateX(-4px);
		}
		80% {
			transform: translateX(4px);
		}
	}
</style>
