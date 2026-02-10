"use client";
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Header } from '@/layouts/header';
import { Sidebar } from '@/layouts/sidebar';
import styles from './app-layout.module.scss';
import { Footer } from '../footer';
import { SidebarState } from '../layout.types';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs/Breadcrumbs';
import { useBreakpoints } from '@/context/breakpoint/Provider';
import { Hamburger } from '@/components/ui/hamburger/hamburger.component';
import { useTheme } from '@/context/theme/ThemeContext';
import type { MobileSidebarState } from '@/context/theme/types';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { smAndDown } = useBreakpoints();
  const { theme, setTheme } = useTheme();

  const sidebar = useMemo<SidebarState>(() => theme.sidebarState, [theme.sidebarState]);

  const prevSidebar = useRef<SidebarState>(sidebar);

  function normalizeMobileState(next: SidebarState): MobileSidebarState {
    return next === 'icon' ? 'closed' : next;
  }

  function toggleSidebar() {
    setSidebarState((prev) => {
      if (smAndDown) {
        return prev === 'open' ? 'closed' : 'open';
      }

      if (prev === 'open') return 'icon';
      if (prev === 'icon') return 'closed';
      return 'open';
    });
  }

  function setSidebarState(next: SidebarState | ((prev: SidebarState) => SidebarState)) {
    if (smAndDown) {
      const resolved = typeof next === 'function'
        ? next(theme.sidebarState)
        : next;
      const normalized = normalizeMobileState(resolved);

      if (normalized !== theme.sidebarState) {
        setTheme({ sidebarState: normalized });
      }
      return;
    }

    const resolved = typeof next === 'function'
      ? next(theme.sidebarState)
      : next;

    if (resolved !== theme.sidebarState) {
      setTheme({ sidebarState: resolved });
    }
  }

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.sidebarPrev = prevSidebar.current;
    root.dataset.sidebarState = sidebar;

    if (sidebar !== prevSidebar.current) {
      prevSidebar.current = sidebar;
    }
  }, [sidebar]);
  
  useEffect(() => {
    if (!smAndDown) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = sidebar === 'open' ? 'hidden' : '';
  }, [smAndDown, sidebar]);

  return (
    <div
      className={styles.root}
    >
      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
      >
        <Hamburger />
      </button>

      <Header />

      <Sidebar
        state={sidebar}
        onClose={() => setSidebarState('closed')}
      />

      <main className={styles.main}>
        <div className={styles.content}>
          <Breadcrumbs />
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
