import { SidebarItem } from "@/types";
import { clsx } from "@/utils";
import Link from "next/link";
import styles from '../sidebar.module.scss';
import { Icon } from "@/components";
import { ChevronDown as ChevronDownIcon } from "@/components/ui/icon/icons";

export function SidebarLeafRow({
  item,
  depth,
  isActive,
  isGroup = false,
  isOpen = false,
  onToggle,
}: {
  item: SidebarItem;
  depth: number;
  isActive: boolean;
  isGroup?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}) {
  const Component = item.href ? Link : 'div';

  return (
    <Component
      href={item.href!}
      data-toc-item
      data-id={item.id}
      data-depth={depth}
      className={clsx(
        styles.itemContent,
        isActive && styles.active,
        isGroup && styles.groupTrigger
      )}
      onClick={onToggle}
    >
      {item.icon && <Icon icon={item.icon} size={18} />}
      <span className={styles.label}>{item.label}</span>

      {isGroup && (
        <Icon
          icon={ChevronDownIcon}
          size={14}
          className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
        />
      )}
    </Component>
  );
}
