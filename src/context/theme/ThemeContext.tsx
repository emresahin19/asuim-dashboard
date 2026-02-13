'use client';

import { createContext } from 'react'
import { SidebarState, ThemeState } from '@/types'

interface ThemeContextValue {
    theme: ThemeState
    setTheme: (next: Partial<ThemeState>) => void
    sidebarState: SidebarState
    setSidebarState: (next: SidebarState) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
