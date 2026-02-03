"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from '@/layouts/header';
import { Sidebar } from '@/layouts/sidebar';
import styles from './app-layout.module.scss';
import { Footer } from '../footer';
import { SidebarState } from '../layout.types';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs/Breadcrumbs';
import { useBreakpoints } from '@/context/breakpoint/Provider';
import { Hamburger } from '@/components/ui/hamburger/hamburger.component';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { smAndDown } = useBreakpoints();
  const [sidebar, setSidebar] = useState<SidebarState>('closed');
  const prevSidebar = useRef<SidebarState>(sidebar);

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
    setSidebar((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;

      if (resolved !== prev) {
        prevSidebar.current = prev;
      }

      return resolved;
    });
  }

  const hamburgerState = useMemo(() => {
    if (smAndDown) {
      return sidebar === 'closed' ? 'open' : 'closed';
    }

    if (sidebar === 'closed') return 'open';
    if (sidebar === 'open') return 'icon';
    return 'closed';
  }, [smAndDown, sidebar]);
  
  useEffect(() => {
    if (!smAndDown) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = sidebar === 'open' ? 'hidden' : '';
  }, [smAndDown, sidebar]);

  useEffect(() => {
    if (smAndDown) {
      setSidebarState('closed');
    } else {
      setSidebarState('open');
    }
  }, [smAndDown]);

  return (
    <div
      className={styles.root}
      data-sidebar-state={sidebar}
      data-sidebar-prev={prevSidebar.current}
    >

      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
      >
        <Hamburger state={hamburgerState} />
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
