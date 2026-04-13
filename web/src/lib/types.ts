export type GameMode = 'letters' | 'both' | 'distance';

export type TileState = 'correct' | 'present' | 'absent' | 'empty';

export type CompassDir = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface LetterResult {
	letter: string;
	state: TileState;
}

export interface PuzzleAirport {
	code: string;
	name: string;
	city: string;
	subd: string;
	country: string;
}

export type CoordsMap = Record<string, [number, number]>;

export interface AirportData {
	puzzles: PuzzleAirport[];
	coords: CoordsMap;
}

export interface GuessResult {
	code: string;
	letters: LetterResult[];
	distanceKm: number | null;
	direction: CompassDir | null;
	bearingDeg: number | null;
	isCorrect: boolean;
}

export interface PersistedDayState {
	date: string;
	guesses: GuessResult[];
	status: 'playing' | 'won' | 'lost';
	mode: GameMode;
}
