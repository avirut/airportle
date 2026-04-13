<script lang="ts">
	import { Info } from '@lucide/svelte';
	import ModeToggle from './ModeToggle.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { onInfoClick }: { onInfoClick: () => void } = $props();
</script>

<header class="border-b border-border bg-background">
	<div class="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6">
		<button
			type="button"
			onclick={onInfoClick}
			aria-label="How to play"
			title="How to play"
			class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
		>
			<Info size={18} />
		</button>

		<h1 class="text-lg font-semibold tracking-tight">Airportle</h1>

		<div class="flex items-center gap-2">
			<ModeToggle />
			<ThemeToggle />
		</div>
	</div>
</header>
