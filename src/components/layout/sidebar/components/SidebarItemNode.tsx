import { SidebarItem } from "@/types";
import styles from '../sidebar.module.scss';
import { SidebarLeafRow } from "./SidebarLeafRow";

export function SidebarItemNode({
  item,
  depth,
  activeId,
  openGroups,
  toggleGroup,
}: {
  item: SidebarItem;
  depth: number;
  activeId: string | null;
  openGroups: Set<string>;
  toggleGroup: (id: string) => void;
}) {

  if (item.role === 'section') {
    return <li className={styles.section}>{item.label}</li>;
  }

  const isGroup = !!(item.children && item.children.length > 0);
  const isOpen = isGroup && openGroups.has(item.id);
  const isSelfActive = item.id === activeId;

  return (
    <li className={styles.item}>
      <SidebarLeafRow
        item={item}
        depth={depth}
        isActive={isSelfActive}
        isGroup={isGroup}
        isOpen={isOpen}
        onToggle={isGroup ? () => toggleGroup(item.id) : undefined}
      />

      {isGroup && isOpen && (
        <ul className={styles.subList}>
          {item.children!.map((child) => (
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
    </li>
  );
}
