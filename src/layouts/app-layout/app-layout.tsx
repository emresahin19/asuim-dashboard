"use client";
import { useEffect, useState } from 'react';
import { Header } from '@/layouts/header';
import { Sidebar } from '@/layouts/sidebar';
import styles from './app-layout.module.scss';
import { clsx } from '@/utils/clsx';
import { Footer } from '../footer';
import { Icon } from '@/components/ui/icon/icon';
import { SidebarState } from '../layout.types';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebar, setSidebar] = useState<SidebarState>('open');

  function toggleSidebar() {
    const isMobile = window.innerWidth < 768;

    setSidebar((prev) => {
      if (isMobile) {
        return prev === 'open' ? 'closed' : 'open';
      }

      if (prev === 'open') return 'icon';
      if (prev === 'icon') return 'closed';
      return 'open';
    });
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    document.body.style.overflow =
      isMobile && sidebar === 'open' ? 'hidden' : '';
  }, [sidebar]);

  return (
    <div className={styles.root} data-sidebar-state={sidebar}>

      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
      >
        <Icon
          name={
            sidebar === 'open'
              ? 'chevron-left'
              : sidebar === 'icon'
                ? 'table-2'
                : 'menu'
          }
          size={28}
        />
      </button>

      <Header />

      <Sidebar
        state={sidebar}
        onClose={() => setSidebar('closed')}
      />

      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      
      <Footer />
    </div>
  );
}
