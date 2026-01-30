'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import type { ThemeState } from './types'

const defaultTheme: ThemeState = {
    scheme: 'light',
    primary: 'blue',
    direction: 'ltr',
    palette: 'slate',
}

const ThemeContext = createContext<{
    theme: ThemeState
    setTheme: (next: Partial<ThemeState>) => void
} | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeState>(defaultTheme)

    function setTheme(next: Partial<ThemeState>) {
        setThemeState((prev) => ({ ...prev, ...next }))
    }

    useEffect(() => {
        const root = document.documentElement

        root.dataset.theme = theme.scheme
        root.dataset.primary = theme.primary
        root.dataset.palette = theme.palette
        root.dir = theme.direction
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
