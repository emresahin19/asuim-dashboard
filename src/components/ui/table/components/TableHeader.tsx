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
  onSortChange?: (key: keyof T, value: SortOrder) => void;
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
    const nextDir: SortOrder = currentDir === 'asc' ? 'desc' : 'asc';
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
    return tableState.sortOrder === 'asc'
      ? <Icon
        size={14}
        icon={ArrowUp}
        decorative
      />
      : <Icon
        size={14}
        icon={ArrowDown}
        decorative
      />;
  };

  return (
    <tr>
        {enableRowSelection && (
          <th scope="col" className={styles.checkboxCol}>
            <Checkbox
              checked={isAllRowsSelected}
              onChange={(event) => onToggleAllRows?.(event.target.checked)}
              aria-label="Tum satirlari sec"
            />
          </th>
        )}
        {columns.map((col, i) => col.isVisible !== false && (
          <th
            key={`${String(col.key)}-${i}`}
            scope="col"
            aria-sort={
              tableState.sortBy === col.key
                ? (tableState.sortOrder === 'asc' ? 'ascending' : 'descending')
                : 'none'
            }
          >
            <div className={styles.headerCell}>
              <span className={styles.headerTitle}>{col.label}</span>

              {col.sortable && (
                <button
                  type="button"
                  className={styles.sortTrigger}
                  onClick={() => handleSort(col.key)}
                  aria-label={`${String(col.label)} sütununu sırala`}
                >
                  {getSortIcon(col.key)}
                </button>
              )}
            </div>
          </th>
        ))}
        {hasActions && <th scope="col">İşlemler</th>}
    </tr>
  );
};