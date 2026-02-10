
'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import type { MobileSidebarState, ThemeState } from './types'
import { THEME_STORAGE_KEY } from './theme-storage'

const defaultTheme: ThemeState = {
    scheme: 'light',
    primary: 'amber',
    direction: 'ltr',
    palette: 'stone',
    sidebarState: 'open',
}

const allowedSchemes: ThemeState['scheme'][] = ['light', 'dark']
const allowedDirections: ThemeState['direction'][] = ['ltr', 'rtl']
const allowedPalettes: ThemeState['palette'][] = ['slate', 'gray', 'zinc', 'neutral', 'stone']
const allowedSidebarStates: ThemeState['sidebarState'][] = ['open', 'icon', 'closed']
const allowedPrimaries: ThemeState['primary'][] = [
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
]

function isValidThemeKey<T extends string>(value: unknown, allowed: readonly T[]): value is T {
    return typeof value === 'string' && allowed.includes(value as T)
}

function readStoredTheme(): Partial<ThemeState> | null {
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

function getInitialTheme(): ThemeState {
    const stored = readStoredTheme()
    if (!stored) return defaultTheme

    return {
        ...defaultTheme,
        ...stored,
    }
}

const ThemeContext = createContext<{
    theme: ThemeState
    setTheme: (next: Partial<ThemeState>) => void
} | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeState>(getInitialTheme)

    function setTheme(next: Partial<ThemeState>) {
        setThemeState((prev) => ({ ...prev, ...next }))
    }

    useEffect(() => {
        const root = document.documentElement

        root.dataset.theme = theme.scheme
        root.dataset.primary = theme.primary
        root.dataset.palette = theme.palette
        root.dir = theme.direction

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
    return ctx
}
