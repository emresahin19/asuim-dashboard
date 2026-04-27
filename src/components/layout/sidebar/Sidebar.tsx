'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { createSidebarConfig } from '@/config/sidebar';
import { Hamburger } from '@/components/ui/hamburger';
import { useBreakpoints, useTheme } from '@/context';

import { useSidebarGesture } from './utils/use-sidebar-gesture';
import { useSidebarState } from './utils/use-sidebar-state';
import { SidebarItemNode } from './components/SidebarItemNode';
import {
  collectActiveGroupIds,
  findActiveIdByPath,
  findVisibleActiveId,
  getVisibleActiveIndexById,
  sidebarTocTokens
} from './utils/toc.utils';

import styles from './sidebar.module.scss';
import dynamic from 'next/dynamic';
import { clsx } from '@/utils';

const TocLazy = dynamic(() => import('@/components/features/toc/Toc'), {
  ssr: false,
});

export function Sidebar({ initialOpenGroups }: { initialOpenGroups: string[] }) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const sidebarConfig = useMemo(
    () => createSidebarConfig({ apps: [] }),
    []
  );
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(initialOpenGroups));
  const {
    sidebarState,
    toggleSidebar,
    setSidebarState,
    toggleGroup
  } = useSidebarState({ setOpenGroups });

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { smAndDown } = useBreakpoints();
  const listRef = useRef<HTMLUListElement>(null)

  const pathname = usePathname()
  const activeId = useMemo(() => findActiveIdByPath(sidebarConfig, pathname), [pathname, sidebarConfig])
  const visibleActiveId = useMemo(
    () => findVisibleActiveId(sidebarConfig, activeId, openGroups),
    [activeId, openGroups]
  )

  useEffect(() => {
    if (!smAndDown) {
      return;
    }
    if (sidebarState === 'open') {
      document.body.style.overflow = 'hidden';
      document.querySelector(`.${styles.overlay}`)?.addEventListener('click', toggleSidebar);
    }

    return () => {
      document.body.style.overflow = '';
      document.querySelector(`.${styles.overlay}`)?.removeEventListener('click', toggleSidebar);
    };
  }, [sidebarState, smAndDown]);

  useEffect(() => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      collectActiveGroupIds(sidebarConfig, pathname, next)
      return next
    })
  }, [pathname, sidebarConfig])

  useEffect(() => {
    if (!listRef.current || !visibleActiveId) {
      setActiveIndex(null)
      return;
    }

    const handle = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!listRef.current) return;
        const next = getVisibleActiveIndexById(listRef.current, visibleActiveId, sidebarConfig);

        setActiveIndex(prev => (prev === next ? prev : next));
      });
    });

    return () => cancelAnimationFrame(handle);
  }, [visibleActiveId, openGroups]);

  const gesture = useSidebarGesture(sidebarRef, {
    isOpen: sidebarState === 'open',
    onClose: () => setSidebarState('closed'),
    sidebarWidth: 240,
  });

  const tokens = useMemo(() => sidebarTocTokens[sidebarState], [sidebarState]);

  return (
    <>
      <div className={clsx(styles.overlay, sidebarState === 'open' && styles.open)}></div>
      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
        aria-controls="main-sidebar"
        aria-expanded={sidebarState === 'open'}
      >
        <Hamburger />
      </button>

      <aside id="main-sidebar" ref={sidebarRef} {...gesture} className={styles.root}>

        <div className={styles.header}>
          <Link href="/" className={styles.logo} aria-label="Asuim - Dashboard">
            <span className={styles.asimText}>Asuim</span>
            <span className={styles.theText}></span>
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Ana navigasyon">
          {activeIndex !== null && (
            <TocLazy
              containerRef={listRef}
              activeIndex={activeIndex}
              direction={theme.direction}
              tokens={tokens}
            />
          )}

          <ul className={styles.list} ref={listRef}>
            {sidebarConfig.map(item => (
              <SidebarItemNode
                key={item.id}
                item={item}
                depth={1}
                activeId={visibleActiveId}
                openGroups={openGroups}
                toggleGroup={toggleGroup}
                onClick={console.log}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}