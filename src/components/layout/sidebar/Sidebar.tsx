'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { sidebarConfig } from '@/config';
import { TocTokens } from '@/types'
import { Hamburger, Toc } from '@/components';

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

export function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const {
    sidebarState,
    toggleSidebar,
    setSidebarState,
    openGroups,
    setOpenGroups,
    toggleGroup
  } = useSidebarState();

  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [tokens, setTokens] = useState<TocTokens | undefined>(undefined)
  const listRef = useRef<HTMLUListElement>(null)

  const pathname = usePathname()

  useEffect(() => {
    setActiveId(findActiveIdByPath(sidebarConfig, pathname))
    const next = new Set(openGroups)

    collectActiveGroupIds(sidebarConfig, pathname, next)

    setOpenGroups(next)
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

  useEffect(() => {
    if (sidebarTocTokens[sidebarState]) {
      setTokens(sidebarTocTokens[sidebarState])
    }
  }, [sidebarState])

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
          <Toc
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