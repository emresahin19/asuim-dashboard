
'use client'

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { getInitialTheme } from './theme.utils'
import { SidebarState, ThemeState } from '@/types'
import { THEME_STORAGE_KEY } from './theme.constant'
import { ThemeContext } from './ThemeContext'
import { useBreakpoints } from '../breakpoint'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeState>(getInitialTheme);

    const [sidebarState, setSidebarState] = useState<SidebarState>(theme.sidebarState);

    const { smAndDown } = useBreakpoints();
    const prevSidebarRef = useRef<SidebarState>(sidebarState);

    const updateSidebarState = useCallback((next: SidebarState) => {
        const finalState = smAndDown && next === 'icon' ? 'closed' : next;

        setSidebarState(finalState);

        if (!smAndDown) {
            setThemeState(prev => ({ ...prev, sidebarState: finalState }));
        }
    }, [smAndDown]);

    const updateTheme = useCallback((next: Partial<ThemeState>) => {
        setThemeState(prev => {
            const updated = { ...prev, ...next };
            if (next.sidebarState && next.sidebarState !== prev.sidebarState) {
                updated.sidebarState = next.sidebarState;
            }
            return updated;
        });
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.body.style.overflow = (smAndDown && sidebarState === 'open') ? 'hidden' : '';
    }, [smAndDown, sidebarState]);

    useEffect(() => {
        if (smAndDown && sidebarState !== 'closed') {
            setSidebarState('closed');
        } else if (!smAndDown && theme.sidebarState !== 'closed') {
            setSidebarState(theme.sidebarState || 'open');
        }
    }, [smAndDown]);

    useEffect(() => {
        const root = document.documentElement;
        root.dataset.sidebarState = sidebarState;
        root.dataset.sidebarPrev = prevSidebarRef.current;
        prevSidebarRef.current = sidebarState;
    }, [sidebarState]);

    useEffect(() => {
        const root = document.documentElement;

        root.dataset.theme = theme.scheme;
        root.dataset.primary = theme.primary;
        root.dataset.palette = theme.palette;
        root.dir = theme.direction;

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme: updateTheme,
            sidebarState,
            setSidebarState: updateSidebarState
        }}>
            {children}
        </ThemeContext.Provider>
    );
}