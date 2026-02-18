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

  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const pathname = usePathname()

  useEffect(() => {
    setActiveId(findActiveIdByPath(sidebarConfig, pathname))
    setOpenGroups(prev => {
      const next = new Set(prev)
      collectActiveGroupIds(sidebarConfig, pathname, next)
      return next
    })
  }, [pathname])

  useEffect(() => {
    if (!listRef.current || !activeId) return;

    const handle = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!listRef.current) return;
        const next = getVisibleActiveIndexById(listRef.current, activeId, sidebarConfig);

        setActiveIndex(prev => {
          if (prev === next) return prev;
          return next;
        });
      });
    });

    return () => cancelAnimationFrame(handle);
  }, [activeId, openGroups]);

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
          <TocLazy
            containerRef={listRef}
            activeIndex={activeIndex}
            tokens={tokens}
          />

          <ul className={styles.list} ref={listRef}>
            {sidebarConfig.map(item => (
              <SidebarItemNode
                key={item.id}
                item={item}
                depth={1}
                activeId={activeId}
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