import { sidebarConfig } from '../../constant/sidebar.config';
import { SidebarItem } from './sidebar.types';
import styles from './sidebar.module.scss';
import { clsx } from '@/utils/clsx';
import { useSidebarGesture } from './use-sidebar-gesture';
import { useEffect, useMemo, useRef } from 'react';
import { Icon } from '@/components/ui/icon/icon';
import { useState } from 'react';
import { SidebarState } from '../layout.types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toc } from '@/components/ui/toc/Toc';
import {
  collectActiveGroupIds,
  findActiveIdByPath,
  getVisibleActiveIndexById,
  isDescendantActive,
  sidebarTocTokens
} from './sidebar.utils';
import { TocTokens } from '@/components/ui/toc/toc.types';

function SidebarLeafRow({
  item,
  depth,
  isActive,
  isGroup = false,
  isOpen = false,
  onToggle,
}: {
  item: SidebarItem
  depth: number
  isActive: boolean
  isGroup?: boolean
  isOpen?: boolean
  onToggle?: () => void
}) {
  const Dom = item.href ? Link : 'div'

  return (
    <Dom
      href={item.href!}
      data-toc-item
      data-id={item.id}
      data-depth={depth}
      className={clsx(
        styles.itemContent,
        isActive && styles.active
      )}
      {...(onToggle ? { onClick: onToggle } : {})}
    >
      {item.icon && <Icon name={item.icon} size={18} />}
      <div className={styles.label}>{item.label}</div>

      {isGroup && (
        <Icon
          name="chevron-down"
          size={14}
          className={clsx(
            styles.chevron,
            isOpen && styles.chevronOpen
          )}
        />
      )}
    </Dom>
  )
}

function SidebarItemNode({
  item,
  depth,
  activeId,
  openGroups,
  toggleGroup,
}: {
  item: SidebarItem
  depth: number
  activeId: string | null
  openGroups: Set<string>
  toggleGroup: (id: string) => void
}) {
  if (item.role === 'section') {
    return <li className={styles.section}>{item.label}</li>
  }

  const isGroup = !!item.children
  const isOpen = isGroup && openGroups.has(item.id)
  const isActive = item.id === activeId
  const hasActiveDescendant =
    isGroup && item.children!.some(child =>
      isDescendantActive(child, activeId)
    )

  /* ---------- GROUP ---------- */
  if (isGroup) {
    const groupActive = isActive || hasActiveDescendant

    return (
      <li className={styles.item}>
        <SidebarLeafRow
          item={item}
          depth={depth}
          isOpen={isOpen}
          isGroup={true}
          isActive={groupActive}
          onToggle={() => toggleGroup(item.id)}
        />

        {/* <div className={clsx(styles.groupBody, isOpen && styles.groupOpen)}> */}
        {isOpen && (
          <ul className={styles.subList}>
            {item.children!.map(child => (
              <SidebarItemNode
                key={child.id}
                item={child}
                depth={depth + 1}
                activeId={activeId}
                openGroups={openGroups}
                toggleGroup={toggleGroup}
              />
            ))}
          </ul>
        )}
        {/* </div> */}
      </li>
    )
  }

  /* ---------- LEAF ---------- */
  return (
    <li className={styles.item}>
      <SidebarLeafRow
        item={item}
        depth={depth}
        isActive={isActive}
      />
    </li>
  )
}

export function Sidebar({
  state,
  onClose,
}: {
  state: SidebarState
  onClose: () => void
}) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const pathname = usePathname()

  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [tokens, setTokens] = useState<TocTokens | undefined>(undefined)

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

  function toggleGroup(id: string) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const gesture = useSidebarGesture(sidebarRef, {
    isOpen: state === 'open',
    onClose,
    sidebarWidth: 240,
    threshold: 50,
  })

  useEffect(() => {
    if (sidebarTocTokens[state]) {
      setTokens(sidebarTocTokens[state])
    }
  }, [state])

  return (
    <aside
      ref={sidebarRef}
      {...gesture}
      className={styles.root}
    >
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
  )
}