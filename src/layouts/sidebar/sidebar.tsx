import { sidebarConfig } from '../../constant/sidebar.config';
import { SidebarItem } from './sidebar.types';
import styles from './sidebar.module.scss';
import { clsx } from '@/utils/clsx';
import { useSidebarGesture } from './use-sidebar-gesture';
import { useRef } from 'react';
import { Icon } from '@/components/ui/icon/icon';
import { useState } from 'react';
import { SidebarState } from '../layout.types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SidebarItemNode({ item }: { item: SidebarItem }) {
  function isItemActive(item: SidebarItem, pathname: string): boolean {
    if (!item.href) return false;
    return pathname === item.href;
  }

  function isGroupActive(item: SidebarItem, pathname: string): boolean {
    if (!item.children) return false;
    return item.children.some((child) => isItemActive(child, pathname) || (child.children ? isGroupActive(child, pathname) : false));
  }

  if (item.role === 'section') {
    return (
      <li className={styles.section}>
        {item.label}
      </li>
    );
  }

  const pathname = usePathname();
  const isGroup = Boolean(item.children);
  const groupActive = isGroup && isGroupActive(item, pathname);
  const [isOpen, setIsOpen] = useState(groupActive);

  // GROUP (collapsible)
  if (isGroup) {
    return (
      <li className={styles.item}>
        <div
          className={clsx(
            styles.itemContent,
            groupActive && styles.active
          )}
          onClick={() => setIsOpen((v) => !v)}
        >
          {item.icon && <Icon name={item.icon} size={22} />}
          <div className={styles.label}>{item.label}</div>

          <Icon
            name="chevron-down"
            size={14}
            className={clsx(
              styles.chevron,
              isOpen && styles.chevronOpen
            )}
          />
        </div>

        <div
          className={clsx(
            styles.groupBody,
            isOpen && styles.groupOpen
          )}
        >
          <ul className={styles.subList}>
            {item.children!.map((child) => (
              <SidebarItemNode key={child.id} item={child} />
            ))}
          </ul>
        </div>
      </li>
    );
  }

  const isActive = isItemActive(item, pathname);

  return (
    <li className={styles.item}>
      {item.href ? (

        <Link
          href={item.href!}
          className={clsx(
            styles.itemContent,
            isActive && styles.active
          )}
        >
          {item.icon && <Icon name={item.icon} size={18} />}
          <div className={styles.label}>{item.label}</div>
        </Link>
      ) : (
        <div
          className={clsx(
            styles.itemContent,
            isActive && styles.active
          )}
        >
          {item.icon && <Icon name={item.icon} size={18} />}
          <div className={styles.label}>{item.label}</div>
        </div>
      )}
    </li>
  );
}

export function Sidebar({
  state,
  onClose,
}: {
  state: SidebarState;
  onClose: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const gesture = useSidebarGesture(sidebarRef, {
    isOpen: state === 'open',
    onClose,
    sidebarWidth: 240,
    threshold: 50,
  });

  return (
    <aside
      ref={sidebarRef}
      {...gesture}
      className={clsx(styles.root)}
    >
      <div className={styles.header}>
        <div className={styles.logo}>LOGO</div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {sidebarConfig.map((item) => (
            <SidebarItemNode key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
