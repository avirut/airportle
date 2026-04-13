import type {
	AirportMap,
	GameMode,
	GuessResult,
	LetterResult,
	PersistedDayState,
	TileState
} from './types.js';
import { bearing, compassDir, haversineKm } from './geo.js';
import { getDayState, setDayState } from './storage.js';

function evaluateGuess(code: string, target: string, airports: AirportMap): GuessResult {
	const letters: LetterResult[] = [
		{ letter: code[0], state: 'absent' },
		{ letter: code[1], state: 'absent' },
		{ letter: code[2], state: 'absent' }
	];
	const targetChars = target.split('');
	const remaining: (string | null)[] = [...targetChars];

	for (let i = 0; i < 3; i++) {
		if (code[i] === target[i]) {
			letters[i].state = 'correct';
			remaining[i] = null;
		}
	}

	for (let i = 0; i < 3; i++) {
		if (letters[i].state === 'correct') continue;
		const j = remaining.indexOf(code[i]);
		if (j !== -1) {
			letters[i].state = 'present';
			remaining[j] = null;
		}
	}

	const isCorrect = letters.every((letter) => letter.state === 'correct');
	let distanceKm: number | null = null;
	let direction = null;
	let bearingDeg: number | null = null;

	const guessAirport = airports[code];
	const targetAirport = airports[target];
	if (guessAirport && targetAirport) {
		distanceKm = haversineKm(
			guessAirport.lat,
			guessAirport.lon,
			targetAirport.lat,
			targetAirport.lon
		);
		if (!isCorrect) {
			bearingDeg = bearing(guessAirport.lat, guessAirport.lon, targetAirport.lat, targetAirport.lon);
			direction = compassDir(bearingDeg);
		}
	}

	return { code, letters, distanceKm, direction, bearingDeg, isCorrect };
}

function normalizeGuesses(
	guesses: PersistedDayState['guesses'],
	target: string,
	airports: AirportMap
): GuessResult[] {
	return guesses
		.map((guess) => guess.code?.toUpperCase())
		.filter((code): code is string => !!code && code.length === 3 && code in airports)
		.map((code) => evaluateGuess(code, target, airports));
}

function deriveStatus(guesses: GuessResult[]): 'playing' | 'won' | 'lost' {
	if (guesses.some((guess) => guess.isCorrect)) return 'won';
	if (guesses.length >= 6) return 'lost';
	return 'playing';
}

function computeKeyColors(guesses: GuessResult[]): Record<string, TileState> {
	const priority: Record<TileState, number> = { correct: 3, present: 2, absent: 1, empty: 0 };
	const result: Record<string, TileState> = {};
	for (const guess of guesses) {
		for (const { letter, state } of guess.letters) {
			const current = result[letter];
			if (!current || priority[state] > priority[current]) {
				result[letter] = state;
			}
		}
	}
	return result;
}

class GameState {
	airports: AirportMap = $state({});
	targetCode: string = $state('');
	guesses: GuessResult[] = $state([]);
	currentInput: string = $state('');
	status: 'playing' | 'won' | 'lost' = $state('playing');
	mode: GameMode = $state('both');
	dateKey: string = $state('');
	shakeActive: boolean = $state(false);
	invalidCode: boolean = $state(false);

	keyColors: Record<string, TileState> = $derived(computeKeyColors(this.guesses));
	canSubmit: boolean = $derived(this.currentInput.length === 3 && this.status === 'playing');

	init(airports: AirportMap, target: string, date: string, mode: GameMode) {
		this.airports = airports;
		this.targetCode = target;
		this.dateKey = date;
		this.mode = mode;

		const persisted = getDayState(date);
		if (persisted && persisted.date === date) {
			this.guesses = normalizeGuesses(persisted.guesses, target, airports);
			this.status = deriveStatus(this.guesses);
		} else {
			this.guesses = [];
			this.status = 'playing';
		}
		this.currentInput = '';
	}

	addLetter(letter: string) {
		if (this.currentInput.length < 3 && this.status === 'playing') {
			this.currentInput += letter.toUpperCase();
			this.invalidCode = false;
		}
	}

	deleteLetter() {
		this.currentInput = this.currentInput.slice(0, -1);
		this.invalidCode = false;
	}

	setMode(mode: GameMode) {
		this.mode = mode;
	}

	submitGuess() {
		if (!this.canSubmit) return;
		const code = this.currentInput;

		if (!(code in this.airports)) {
			this.invalidCode = true;
			this.shakeActive = true;
			setTimeout(() => {
				this.shakeActive = false;
			}, 500);
			return;
		}

		const result = evaluateGuess(code, this.targetCode, this.airports);
		this.guesses = [...this.guesses, result];
		this.currentInput = '';
		this.invalidCode = false;
		this.status = deriveStatus(this.guesses);

		setDayState(this.dateKey, {
			date: this.dateKey,
			guesses: this.guesses,
			status: this.status,
			mode: this.mode
		});
	}
}

export const game = new GameState();
