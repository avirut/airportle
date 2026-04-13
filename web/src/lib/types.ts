export type GameMode = 'letters' | 'both' | 'distance';

export type TileState = 'correct' | 'present' | 'absent' | 'empty';

export type CompassDir = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface LetterResult {
	letter: string;
	state: TileState;
}

export interface Airport {
	name: string;
	city: string;
	subd: string;
	country: string;
	lat: number;
	lon: number;
	size: string;
}

export interface AirportMap {
	[iata: string]: Airport;
}

export interface GuessResult {
	code: string;
	letters: LetterResult[];
	distanceKm: number | null;
	direction: CompassDir | null;
	isCorrect: boolean;
}

export interface PersistedDayState {
	date: string;
	guesses: GuessResult[];
	status: 'playing' | 'won' | 'lost';
	mode: GameMode;
}
