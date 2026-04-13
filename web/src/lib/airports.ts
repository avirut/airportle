import airportsJson from '../assets/airports.json';
import type { AirportMap } from './types.js';

export const airports: AirportMap = airportsJson as AirportMap;

const DAY_ZERO = new Date(Date.UTC(2026, 3, 12)); // April 12 2026

export function getDailyCode(now: Date): string {
	const keys = Object.keys(airports); // insertion order = random shuffle from generation
	const idx = Math.floor((now.getTime() - DAY_ZERO.getTime()) / 86_400_000);
	return keys[((idx % keys.length) + keys.length) % keys.length];
}

export function getTodayDateKey(): string {
	return new Date().toISOString().slice(0, 10);
}
