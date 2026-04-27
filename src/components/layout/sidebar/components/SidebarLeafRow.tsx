import { SidebarItem } from "@/types";
import { clsx } from "@/utils";
import Link from "next/link";
import styles from '../sidebar.module.scss';
import { Icon } from "@/components";
import ChevronDownIcon from "@/components/ui/icon/icons/ChevronDown";

export function SidebarLeafRow({
  item,
  depth,
  isActive,
  isGroup = false,
  isOpen = false,
  onToggle,
  onClick
}: {
  item: SidebarItem;
  depth: number;
  isActive: boolean;
  isGroup?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
}) {
  const content = (
    <>
      {item.icon && <Icon icon={item.icon} size={18} decorative />}
      <span className={styles.label}>{item.label}</span>

      {isGroup && (
        <Icon
          icon={ChevronDownIcon}
          size={14}
          decorative
          className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
        />
      )}
    </>
  );

  if (isGroup) {
    return (
      <button
        type="button"
        data-toc-item
        data-id={item.id}
        data-depth={depth}
        className={clsx(styles.itemContent, styles.groupTrigger, isActive && styles.active)}
        onClick={(e) => {
          onClick?.();
          onToggle?.();
        }}
        aria-expanded={isOpen}
      >
        {content}
      </button>
    );
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        data-toc-item
        data-id={item.id}
        data-depth={depth}
        className={clsx(styles.itemContent, isActive && styles.active)}
        aria-current={isActive ? 'page' : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      data-toc-item
      data-id={item.id}
      data-depth={depth}
      className={clsx(
        styles.itemContent,
        isActive && styles.active
      )}
    >
      {content}
    </div>
  );
}
