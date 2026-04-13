<script lang="ts">
	import { onMount } from 'svelte';
	import { coords, getDailyCode, getTodayDateKey } from '$lib/airports.js';
	import Footer from '$lib/components/Footer.svelte';
	import GameBoard from '$lib/components/GameBoard.svelte';
	import Header from '$lib/components/Header.svelte';
	import IntroDialog from '$lib/components/IntroDialog.svelte';
	import Keyboard from '$lib/components/Keyboard.svelte';
	import ResultToast from '$lib/components/ResultToast.svelte';
	import { game } from '$lib/game.svelte.js';
	import { getGameMode, getIntroSeen, setIntroSeen } from '$lib/storage.js';

	let showIntro = $state(false);
	let loaded = $state(false);

	onMount(() => {
		const dateKey = getTodayDateKey();
		const target = getDailyCode(new Date());
		const mode = getGameMode() ?? 'both';

		game.init(coords, target, dateKey, mode);

		if (!getIntroSeen()) showIntro = true;

		loaded = true;
	});

	function handleKeydown(event: KeyboardEvent) {
		if (!loaded || game.status !== 'playing') return;
		if (event.ctrlKey || event.metaKey || event.altKey) return;
		if (/^[A-Za-z]$/.test(event.key)) game.addLetter(event.key);
		else if (event.key === 'Backspace') game.deleteLetter();
		else if (event.key === 'Enter') game.submitGuess();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if !loaded}
	<div class="flex h-screen items-center justify-center">
		<span class="text-muted-foreground">Loading...</span>
	</div>
{:else}
	<div class="flex min-h-screen flex-col bg-background">
		<Header onInfoClick={() => (showIntro = true)} />
		<main
			class="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 py-5 sm:px-6"
		>
			<div class="flex flex-1 flex-col items-center justify-center gap-6">
				<GameBoard />
				<ResultToast />
			</div>
			<div class="relative mt-auto w-full max-w-md pt-4">
				{#if game.invalidCode}
					<p class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-destructive">
						Not a valid IATA code
					</p>
				{/if}
				<Keyboard />
			</div>
		</main>
		<Footer />
	</div>

	<IntroDialog
		open={showIntro}
		onClose={() => {
			showIntro = false;
			setIntroSeen();
		}}
	/>
{/if}
