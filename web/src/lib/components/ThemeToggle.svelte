<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { theme } from '$lib/theme.svelte.js';

	const label = $derived(
		theme.resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
	);
</script>

<button
	type="button"
	aria-label={label}
	title={label}
	onclick={() => theme.toggle()}
	class="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
>
	{#if theme.resolved === 'dark'}
		<Sun size={18} />
	{:else}
		<Moon size={18} />
	{/if}
</button>
