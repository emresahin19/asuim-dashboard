'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { sidebarConfig } from '@/config';
import { Hamburger } from '@/components';

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

const TocLazy = dynamic(() => import('@/components/features/toc/Toc'), {
  ssr: false,
});

export function Sidebar({ initialOpenGroups }: { initialOpenGroups: string[] }) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(initialOpenGroups));
  const {
    sidebarState,
    toggleSidebar,
    setSidebarState,
    toggleGroup
  } = useSidebarState({ setOpenGroups });

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const pathname = usePathname()
  const activeId = useMemo(() => findActiveIdByPath(sidebarConfig, pathname), [pathname])
  const visibleActiveId = useMemo(
    () => findVisibleActiveId(sidebarConfig, activeId, openGroups),
    [activeId, openGroups]
  )

  useEffect(() => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      collectActiveGroupIds(sidebarConfig, pathname, next)
      return next
    })
  }, [pathname])

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
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <Hamburger />
      </button>

      <aside ref={sidebarRef} {...gesture} className={styles.root}>

        <div className={styles.header}>
          <div className={styles.logo}>LOGO</div>
        </div>

        <nav className={styles.nav}>
          {activeIndex !== null && (
            <TocLazy
              containerRef={listRef}
              activeIndex={activeIndex}
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
              />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}