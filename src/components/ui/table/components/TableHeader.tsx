import React from 'react';
import ArrowUp from '@/components/ui/icon/icons/ArrowUp'; // Lucide zorunlu (Madde 7.2)
import ArrowDown from '@/components/ui/icon/icons/ArrowDown'; // Lucide zorunlu (Madde 7.2)
import ArrowUpDown from '@/components/ui/icon/icons/ArrowUpDown'; // Lucide zorunlu (Madde 7.2)
import { TableColumn, TableState } from '../table.types';
import styles from '../table.module.scss';
import { Icon } from '@/components/ui/icon';
import { SortOrder } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';

interface HeaderProps<T> {
  columns: TableColumn<T>[];
  tableState: TableState<T>;
  onSortChange?: (key: keyof T, value: SortOrder | undefined) => void;
  enableRowSelection: boolean;
  isAllRowsSelected: boolean;
  onToggleAllRows?: (checked: boolean) => void;
  hasActions: boolean;
}

export const TableHeader = <T,>({
  columns,
  tableState,
  onSortChange,
  enableRowSelection,
  isAllRowsSelected,
  onToggleAllRows,
  hasActions,
}: HeaderProps<T>) => {

  const handleSort = (key: keyof T) => {
    if (!onSortChange) return;
    const currentDir = tableState.sortBy === key ? tableState.sortOrder : undefined;
    const nextDir: SortOrder | undefined =
      currentDir === undefined ? 'asc' : currentDir === 'asc' ? 'desc' : undefined;
    onSortChange(key, nextDir);
  };

  const getSortIcon = (key: keyof T) => {
    if (tableState.sortBy !== key) {
      return (
        <Icon
          size={14}
          icon={ArrowUpDown}
          decorative
        />
      )
    }
    if (tableState.sortOrder === 'asc') {
      return <Icon
        size={14}
        icon={ArrowUp}
        decorative
      />;
    }

    if (tableState.sortOrder === 'desc') {
      return <Icon
        size={14}
        icon={ArrowDown}
        decorative
      />;
    }

    return <Icon
      size={14}
      icon={ArrowUpDown}
      decorative
    />;
  };

  return (
    <thead>
      <tr>
        {enableRowSelection && (
          <th scope="col" className={styles.checkboxCol}>
            <Checkbox
              checked={isAllRowsSelected}
              onChange={(event) => onToggleAllRows?.(event.target.checked)}
              aria-label="Select all rows"
            />
          </th>
        )}
        {columns.map((col, i) => col.isVisible !== false && (
          <th
            key={`${String(col.key)}-${i}`}
            scope="col"
            aria-sort={
              tableState.sortBy === col.key
                ? (tableState.sortOrder === 'asc' ? 'ascending' : tableState.sortOrder === 'desc' ? 'descending' : 'none')
                : 'none'
            }
          >
            <button
              type="button"
              className={`${styles.headerCell} ${col.sortable ? styles.sortTrigger : ''}`}
              onClick={col.sortable ? () => handleSort(col.key) : undefined}
              aria-label={col.sortable ? `Sort by ${String(col.label)}` : undefined}
              disabled={!col.sortable}
            >
              <span className={styles.headerTitle}>{col.label}</span>

              {col.sortable && (
                getSortIcon(col.key)
              )}
            </button>
          </th>
        ))}
        {hasActions && <th scope="col">Actions</th>}
      </tr>
    </thead>

  );
};