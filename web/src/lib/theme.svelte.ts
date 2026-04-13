export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'airportle:theme';
const THEME_COLOR: Record<ResolvedTheme, string> = {
	light: '#fcfaf7',
	dark: '#211c19'
};

function isThemePreference(value: string | null): value is ThemePreference {
	return value === 'light' || value === 'dark' || value === 'system';
}

class ThemeState {
	preference: ThemePreference = $state('system');
	systemPrefersDark = $state(false);
	isReady = $state(false);

	private mediaQuery: MediaQueryList | null = null;
	private readonly handleSystemThemeChange = (event: MediaQueryListEvent) => {
		this.systemPrefersDark = event.matches;
		this.apply();
	};

	resolved: ResolvedTheme = $derived(
		this.preference === 'system' ? (this.systemPrefersDark ? 'dark' : 'light') : this.preference
	);

	init() {
		if (typeof window === 'undefined' || this.isReady) return;

		const stored = window.localStorage.getItem(STORAGE_KEY);
		this.preference = isThemePreference(stored) ? stored : 'system';

		this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		this.systemPrefersDark = this.mediaQuery.matches;
		this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);

		this.isReady = true;
		this.apply();
	}

	cleanup() {
		this.mediaQuery?.removeEventListener('change', this.handleSystemThemeChange);
		this.mediaQuery = null;
		this.isReady = false;
	}

	setPreference(preference: ThemePreference) {
		this.preference = preference;
		if (typeof window !== 'undefined') {
			if (preference === 'system') {
				window.localStorage.removeItem(STORAGE_KEY);
			} else {
				window.localStorage.setItem(STORAGE_KEY, preference);
			}
		}
		this.apply();
	}

	toggle() {
		this.setPreference(this.resolved === 'dark' ? 'light' : 'dark');
	}

	private apply() {
		if (typeof document === 'undefined') return;

		const root = document.documentElement;
		const isDark = this.resolved === 'dark';

		root.classList.toggle('dark', isDark);
		root.style.colorScheme = this.resolved;
		root.dataset.theme = this.preference;

		const themeMeta = document.querySelector('meta[name="theme-color"]');
		if (themeMeta) {
			themeMeta.setAttribute('content', THEME_COLOR[this.resolved]);
		}
	}
}

export const theme = new ThemeState();
