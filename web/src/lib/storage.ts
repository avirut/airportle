import type { GameMode, PersistedDayState } from './types.js';

const safe = typeof localStorage !== 'undefined';

const KEYS = {
	GAME_MODE: 'airportle:mode',
	INTRO_SEEN: 'airportle:intro',
	dayState: (date: string) => `airportle:day:${date}`
} as const;

export function getGameMode(): GameMode | null {
	if (!safe) return null;
	const v = localStorage.getItem(KEYS.GAME_MODE);
	if (v === 'letters' || v === 'both' || v === 'distance') return v;
	return null;
}

export function setGameMode(v: GameMode): void {
	if (!safe) return;
	localStorage.setItem(KEYS.GAME_MODE, v);
}

export function getIntroSeen(): boolean {
	if (!safe) return false;
	return localStorage.getItem(KEYS.INTRO_SEEN) === '1';
}

export function setIntroSeen(): void {
	if (!safe) return;
	localStorage.setItem(KEYS.INTRO_SEEN, '1');
}

export function getDayState(date: string): PersistedDayState | null {
	if (!safe) return null;
	const raw = localStorage.getItem(KEYS.dayState(date));
	if (!raw) return null;
	try {
		return JSON.parse(raw) as PersistedDayState;
	} catch {
		return null;
	}
}

export function setDayState(date: string, state: PersistedDayState): void {
	if (!safe) return;
	localStorage.setItem(KEYS.dayState(date), JSON.stringify(state));
}
