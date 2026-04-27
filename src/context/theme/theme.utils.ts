import Cookies from 'js-cookie';
import { ThemeState } from "@/types"
import { allowedDirections, allowedPalettes, allowedPrimaries, allowedSchemes, allowedSidebarStates, defaultTheme, THEME_STORAGE_KEY } from "./theme.constant"

export function isValidThemeKey<T extends string>(value: unknown, allowed: readonly T[]): value is T {
    return typeof value === 'string' && allowed.includes(value as T)
}

export function readStoredTheme(cookieValue?: string): Partial<ThemeState> | null {
    try {
        const raw = cookieValue || Cookies.get(THEME_STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as Partial<ThemeState>;
        const next: Partial<ThemeState> = {};

        if (isValidThemeKey(parsed.scheme, allowedSchemes)) next.scheme = parsed.scheme;
        if (isValidThemeKey(parsed.direction, allowedDirections)) next.direction = parsed.direction;
        if (isValidThemeKey(parsed.palette, allowedPalettes)) next.palette = parsed.palette;
        if (isValidThemeKey(parsed.primary, allowedPrimaries)) next.primary = parsed.primary;
        if (isValidThemeKey(parsed.sidebarState, allowedSidebarStates)) next.sidebarState = parsed.sidebarState;

        return Object.keys(next).length ? next : null;
    } catch {
        return null;
    }
}

export function getInitialTheme(initialData?: Partial<ThemeState> | null): ThemeState {
    if (!initialData) return defaultTheme;
    return { ...defaultTheme, ...initialData };
}

export function storeTheme(theme: ThemeState) {
    const toStore = JSON.stringify(theme);
    Cookies.set(THEME_STORAGE_KEY, toStore, { expires: 365 });
}

export function getServerSideTheme({ viewport }: { viewport: 'mobile' | 'desktop' }): string {
    return `
        (function() {
            try {
                const stored = localStorage.getItem('${THEME_STORAGE_KEY}');
                let theme = ${defaultTheme ? JSON.stringify(defaultTheme) : null};
                
                if (stored) {
                    theme = JSON.parse(stored);
                }

                const root = document.documentElement;
                
                // Apply theme data immediately (before render)
                root.dataset.theme = theme.scheme;
                root.dataset.primary = theme.primary || 'blue';
                root.dataset.palette = theme.palette || 'light';
                root.dir = theme.direction || 'ltr';
                root.dataset.sidebarState = ${viewport === 'mobile'} ? 'closed' : (theme.sidebarState || 'open');
                root.dataset.sidebarPrev = ${viewport === 'mobile'} ? 'closed' : (theme.sidebarState || 'open');

            } catch (e) {}
        })();
    `
}