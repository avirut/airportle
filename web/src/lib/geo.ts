import type { CompassDir } from './types.js';

const R = 6371; // Earth radius in km

function toRad(deg: number): number {
	return (deg * Math.PI) / 180;
}

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function bearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const dLon = toRad(lon2 - lon1);
	const rlat1 = toRad(lat1);
	const rlat2 = toRad(lat2);
	const y = Math.sin(dLon) * Math.cos(rlat2);
	const x = Math.cos(rlat1) * Math.sin(rlat2) - Math.sin(rlat1) * Math.cos(rlat2) * Math.cos(dLon);
	return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const COMPASS_DIRS: CompassDir[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export function compassDir(bearingDeg: number): CompassDir {
	// Each sector is 45 degrees, offset by 22.5 degrees so North is centered on 0/360.
	const idx = Math.round(bearingDeg / 45) % 8;
	return COMPASS_DIRS[idx];
}
