import { ThemeState } from "@/types"
import { allowedDirections, allowedPalettes, allowedPrimaries, allowedSchemes, allowedSidebarStates, defaultTheme, THEME_STORAGE_KEY } from "./theme.constant"

export function isValidThemeKey<T extends string>(value: unknown, allowed: readonly T[]): value is T {
    return typeof value === 'string' && allowed.includes(value as T)
}

export function readStoredTheme(): Partial<ThemeState> | null {
    if (typeof window === 'undefined') return null

    try {
        const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
        if (!raw) return null

        const parsed = JSON.parse(raw) as Partial<ThemeState>
        const next: Partial<ThemeState> = {}

        if (isValidThemeKey(parsed.scheme, allowedSchemes)) next.scheme = parsed.scheme
        if (isValidThemeKey(parsed.direction, allowedDirections)) next.direction = parsed.direction
        if (isValidThemeKey(parsed.palette, allowedPalettes)) next.palette = parsed.palette
        if (isValidThemeKey(parsed.primary, allowedPrimaries)) next.primary = parsed.primary
        if (isValidThemeKey(parsed.sidebarState, allowedSidebarStates)) next.sidebarState = parsed.sidebarState

        return Object.keys(next).length ? next : null
    } catch {
        return null
    }
}

export function getInitialTheme(): ThemeState {
    const stored = readStoredTheme()
    if (!stored) return defaultTheme

    return {
        ...defaultTheme,
        ...stored,
    }
}
