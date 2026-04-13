import airportsJson from '../assets/airports.json';
import type { AirportData, CoordsMap, PuzzleAirport } from './types.js';

const data = airportsJson as unknown as AirportData;

export const puzzles: PuzzleAirport[] = data.puzzles;
export const coords: CoordsMap = data.coords;

const DAY_ZERO = new Date(Date.UTC(2026, 3, 12)); // April 12 2026

export function getDailyCode(now: Date): string {
	const idx = Math.floor((now.getTime() - DAY_ZERO.getTime()) / 86_400_000);
	return puzzles[((idx % puzzles.length) + puzzles.length) % puzzles.length].code;
}

export function getPuzzleByCode(code: string): PuzzleAirport | undefined {
	return puzzles.find((p) => p.code === code);
}

export function isValidCode(code: string): boolean {
	return code in coords;
}

export function getTodayDateKey(): string {
	return new Date().toISOString().slice(0, 10);
}
