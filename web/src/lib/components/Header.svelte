<script lang="ts">
	import { Info } from '@lucide/svelte';
	import ModeToggle from './ModeToggle.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { onInfoClick }: { onInfoClick: () => void } = $props();
</script>

<header class="border-b border-border bg-background">
	<!-- Desktop: title centered via absolute, controls right-aligned -->
	<div class="relative mx-auto hidden max-w-5xl items-center px-4 py-2.5 sm:flex">
		<h1
			class="pointer-events-none absolute inset-x-0 text-center text-lg font-semibold tracking-tight"
		>
			Airportle
		</h1>
		<div class="relative z-10 ml-auto flex items-center gap-2">
			<ModeToggle />
			<ThemeToggle />
			<button
				type="button"
				onclick={onInfoClick}
				aria-label="How to play"
				title="How to play"
				class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
			>
				<Info size={18} />
			</button>
		</div>
	</div>

	<!-- Mobile: title + icon buttons top row, mode toggle second row -->
	<div class="sm:hidden">
		<div class="flex items-center justify-between px-4 py-2">
			<h1 class="text-lg font-semibold tracking-tight">Airportle</h1>
			<div class="flex items-center gap-1">
				<ThemeToggle />
				<button
					type="button"
					onclick={onInfoClick}
					aria-label="How to play"
					title="How to play"
					class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				>
					<Info size={18} />
				</button>
			</div>
		</div>
		<div class="flex justify-center border-t border-border/50 px-4 py-2">
			<ModeToggle />
		</div>
	</div>
</header>
