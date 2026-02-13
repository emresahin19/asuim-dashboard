
'use client'

import {
    useEffect,
    useState,
} from 'react'
import { getInitialTheme } from './theme.utils'
import { ThemeState } from '@/types'
import { THEME_STORAGE_KEY } from './theme.constant'
import { ThemeContext } from './ThemeContext'

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
