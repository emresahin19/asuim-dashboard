
'use client'

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { SidebarState, ThemeProviderProps, ThemeState } from '@/types'
import { ThemeContext } from './ThemeContext'
import { useBreakpoints } from '../breakpoint'
import { storeTheme } from './theme.utils'

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<ThemeState>(initialTheme);
    const [isMounted, setIsMounted] = useState(false);
    const [sidebarState, setSidebarState] = useState<SidebarState>(theme.sidebarState);

    const { smAndDown } = useBreakpoints();
    const prevSidebarRef = useRef<SidebarState>(sidebarState);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const updateSidebarState = useCallback((next: SidebarState) => {
        const final = smAndDown && next === 'icon' ? 'closed' : next;
        setSidebarState(final);
        if (!smAndDown) {
            setThemeState(prev => ({ ...prev, sidebarState: final }));
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
        if (smAndDown && sidebarState !== 'closed') {
            setSidebarState('closed');
        } else if (!smAndDown && theme.sidebarState !== 'closed') {
            setSidebarState(theme.sidebarState || 'open');
        }
    }, [smAndDown]);

    useEffect(() => {
        if (!isMounted) return;
        const root = document.documentElement;

        const updates = {
            'theme': theme.scheme,
            'primary': theme.primary,
            'palette': theme.palette,
            'sidebarState': sidebarState,
            'sidebarPrev': prevSidebarRef.current
        };

        Object.entries(updates).forEach(([key, value]) => {
            if (root.dataset[key] !== value) {
                root.dataset[key] = value;
            }
        });

        if (root.dir !== theme.direction) root.dir = theme.direction;

        document.body.style.overflow = (smAndDown && sidebarState === 'open') ? 'hidden' : '';

        storeTheme({ ...theme, sidebarState: theme.sidebarState });

        prevSidebarRef.current = sidebarState;
    }, [theme, sidebarState, isMounted, smAndDown]);

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