
import { createContext } from 'react'
import { ThemeState } from '@/types'

export const ThemeContext = createContext<{
    theme: ThemeState
    setTheme: (next: Partial<ThemeState>) => void
} | null>(null)
