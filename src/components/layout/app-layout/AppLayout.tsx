"use client";
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { Footer } from '../footer';
import { Header } from '../header';
import { Sidebar } from '../sidebar';

import { BreadCrumbs, Hamburger } from '@/components';
import { useBreakpoints, useTheme } from '@/context';
import type { MobileSidebarState, SidebarState } from '@/types';
import { resolveBreadcrumbs, resolveRouteByPathname } from '@/utils';

import styles from './app-layout.module.scss';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { smAndDown } = useBreakpoints();
  const { theme, setTheme } = useTheme();

  const sidebar = useMemo<SidebarState>(() => theme.sidebarState, [theme.sidebarState]);

  const prevSidebar = useRef<SidebarState>(sidebar);
  
  const pathname = usePathname();
  const route = resolveRouteByPathname(pathname);
  const breadcrumbs = resolveBreadcrumbs(pathname);

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

      <Header title={route?.title} />

      <Sidebar
        state={sidebar}
        onClose={() => setSidebarState('closed')}
      />

      <main className={styles.main}>
        <div className={styles.content}>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
