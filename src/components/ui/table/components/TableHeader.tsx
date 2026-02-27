import React from 'react';
import ArrowUp from '@/components/ui/icon/icons/ArrowUp'; // Lucide zorunlu (Madde 7.2)
import ArrowDown from '@/components/ui/icon/icons/ArrowDown'; // Lucide zorunlu (Madde 7.2)
import ArrowUpDown from '@/components/ui/icon/icons/ArrowUpDown'; // Lucide zorunlu (Madde 7.2)
import { TableColumn, TableState, SortOrder } from '../table.types';
import styles from '../table.module.scss';
import { Icon } from '@/components/ui/icon';
import { TableFilter } from './TableFilter';

interface HeaderProps<T> {
  columns: TableColumn<T>[];
  tableState: TableState<T>;
  onSortChange?: (key: keyof T, value: SortOrder) => void;
  onFilterChange?: (key: keyof T, value: string) => void;
  hasActions: boolean;
}

export const TableHeader = <T,>({
  columns,
  tableState,
  onSortChange,
  onFilterChange,
  hasActions,
}: HeaderProps<T>) => {

  const handleSort = (key: keyof T) => {
    if (!onSortChange) return;
    const currentDir = tableState.orderBy === key ? tableState.orderDirection : undefined;
    const nextDir: SortOrder = currentDir === 'ASC' ? 'DESC' : 'ASC';
    onSortChange(key, nextDir);
  };

  const getSortIcon = (key: keyof T) => {
    if (tableState.orderBy !== key) {
      return (
        <Icon
          size={14}
          icon={ArrowUpDown}
        />
      )
    }
    return tableState.orderDirection === 'ASC'
      ? <Icon
        size={14}
        icon={ArrowUp}
      />
      : <Icon
        size={14}
        icon={ArrowDown}
      />;
  };

  return (
    <thead>
      <tr>
        {columns.map((col, i) => col.isVisible !== false && (
          <th key={`${String(col.key)}-${i}`} scope="col">
            <div className={styles.headerCell}>
              <TableFilter
                column={col}
                tableState={tableState}
                onFilterChange={onFilterChange}
              />

              {col.sortable && (
                <div
                  className={styles.sortTrigger}
                  onClick={() => handleSort(col.key)}
                >
                  {getSortIcon(col.key)}
                </div>
              )}
            </div>
          </th>
        ))}
        {hasActions && <th scope="col">İşlemler</th>}
      </tr>
    </thead>
  );
};