import { sidebarConfig } from './sidebar.config';
import { SidebarItem } from './sidebar.types';
import styles from './sidebar.module.scss';
import { clsx } from '@/utils/clsx';
import { Hamburger } from '@/components/ui/hamburger-button';
import { useSidebarGesture } from './use-sidebar-gesture';
import { useRef } from 'react';
import { Icon } from '@/components/ui/icon/icon';
import { useState } from 'react';

function SidebarItemNode({ item }: { item: SidebarItem }) {
  // SECTION (sadece başlık)
  if (item.role === 'section') {
    return (
      <li className={styles.section}>
        {item.label}
      </li>
    );
  }

  const isGroup = Boolean(item.children && item.children.length > 0 && !item.href);
  const [isOpen, setIsOpen] = useState(false);

  // GROUP (collapsible)
  if (isGroup) {
    return (
      <li className={styles.item}>
        <div
          className={styles.itemContent}
          onClick={() => setIsOpen((s) => !s)}
        >
          {item.icon && <Icon name={item.icon} size={18} />}
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

  // ITEM (leaf)
  return (
    <li className={styles.item}>
      <div className={styles.itemContent}>
        {item.icon && <Icon name={item.icon} size={18} />}
        <div className={styles.label}>{item.label}</div>
      </div>
    </li>
  );
}

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const gesture = useSidebarGesture(sidebarRef, {
    isOpen,
    onClose,
    sidebarWidth: 240,
    threshold: 50,
  });

  return (
    <aside
      ref={sidebarRef}
      {...gesture}
      className={clsx(styles.root, isOpen && styles.open)}
    >
      <div className={styles.header}>
        <div className={styles.logo}>LOGO</div>

        <Hamburger
          className={styles.hamburger}
          isActive={isOpen}
          variant="Hamburger2"
          onClick={onClose}
        />
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
