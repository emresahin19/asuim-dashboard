import React from 'react';
import ArrowUp from '@/components/ui/icon/icons/ArrowUp'; // Lucide zorunlu (Madde 7.2)
import ArrowDown from '@/components/ui/icon/icons/ArrowDown'; // Lucide zorunlu (Madde 7.2)
import ArrowUpDown from '@/components/ui/icon/icons/ArrowUpDown'; // Lucide zorunlu (Madde 7.2)
import { TableColumn, TableState, SortOrder } from '../table.types';
import styles from '../table.module.scss';
import { Icon } from '@/components/ui/icon';

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
              {/* Label & Sort */}
              <div
                className={`${styles.headerContent} ${col.sortable ? styles.sortable : ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span>{col.label}</span>
                {col.icon && <span className={styles.icon}>{col.icon}</span>}
                {col.sortable && getSortIcon(col.key)}
              </div>

              {/* Filters (Native Inputs) */}
              {col.filterable && (
                <div className={styles.filterWrapper}>
                  {col.type === 'select' && col.options ? (
                    <select
                      className={styles.nativeSelect}
                      value={tableState.filters[col.key] || ''}
                      onChange={(e) => onFilterChange?.(col.key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="">Tümü</option>
                      {col.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={col.type === 'number' ? 'number' : 'text'}
                      className={styles.nativeInput}
                      placeholder="Ara..."
                      value={tableState.filters[col.key] || ''}
                      onChange={(e) => onFilterChange?.(col.key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
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