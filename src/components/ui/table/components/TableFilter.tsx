"use client";

import { DatePicker, Input, Select } from '@/components';
import { TableColumn, TableState } from '../table.types';
import styles from '../table.module.scss';

interface TableFilterProps<T> {
  column: TableColumn<T>;
  tableState: TableState<T>;
  onFilterChange?: (key: keyof T, value: string) => void;
}

export const TableFilter = <T,>({
  column,
  tableState,
  onFilterChange,
}: TableFilterProps<T>) => {
  const value = tableState.filters[column.key] || '';

  if (!column.filterable) {
    return (
      <div className={styles.headerContent}>
        {column.label}
      </div>
    );
  }

  const renderFilterInput = () => {
    switch (column.type) {
      case 'select':
        const selectedOption = column.options?.find(opt => opt.value === value);
        return (
          <Select
            value={selectedOption}
            label={column.label}
            variant="floating"
            size='sm'
            options={column.options || []}
            onChange={(e) => onFilterChange?.(column.key, String(Array.isArray(e) ? e[0]?.value || '' : e?.value || ''))}
          />
        );

      case 'date':
      case 'datetime':
        return (
          <DatePicker
            value={value ? new Date(value) : undefined}
            onChange={(date) => onFilterChange?.(column.key, date ? String(date) : '')}
            className={styles.filterInput}
            ariaLabel={column.label}
            placeholder={column.label}
          />
        );

      case 'number':
      case 'text':
      default:
        return (
          <Input
            type={column.type === 'number' ? 'number' : 'text'}
            className={styles.filterInput}
            isClearable
            label={column.label}
            value={value}
            variant="floating"
            size="sm"
            onChange={(e) => onFilterChange?.(column.key, e.target.value)}
          />
        );
    }
  };

  return (
    <div className={styles.headerContent} onClick={(e) => e.stopPropagation()}>
      {renderFilterInput()}
    </div>
  );
};