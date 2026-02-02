"use client";
import { useEffect, useRef, useState } from 'react';
import { Header } from '@/layouts/header';
import { Sidebar } from '@/layouts/sidebar';
import styles from './app-layout.module.scss';
import { Footer } from '../footer';
import { Icon } from '@/components/ui/icon/icon';
import { SidebarState } from '../layout.types';
import { usePathname } from 'next/navigation';
import { resolveRouteByPathname, resolveBreadcrumbs } from '@/utils/route-resolver';
import { RouteProvider } from '@/context/route/RouteContext';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs/Breadcrumbs';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebar, setSidebar] = useState<SidebarState>('open');
  const prevSidebar = useRef<SidebarState>(sidebar);
  const pathname = usePathname();

  const route = resolveRouteByPathname(pathname);
  const breadcrumbs = resolveBreadcrumbs(pathname);

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
    prevSidebar.current = sidebar;

    const isMobile = window.innerWidth < 768;
    document.body.style.overflow =
      isMobile && sidebar === 'open' ? 'hidden' : '';
  }, [sidebar]);

  return (
    <RouteProvider
      value={{
        title: route?.title,
        breadcrumbs,
      }}
    >
      <div className={styles.root} data-sidebar-state={sidebar} data-sidebar-prev={prevSidebar.current}>

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
          <div className={styles.content}>
            <Breadcrumbs />
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </RouteProvider>
  );
}
