"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
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

  // Filtreleme kapalıysa sadece label döner (Senin istediğin aynı görünüm kuralı)
  if (!column.filterable) {
    return (
      <div className={styles.headerContent}>
        {column.label}
      </div>
    );
  }

  // Type'a göre input render ediyoruz (Şimdilik Input ile başlıyoruz)
  const renderFilterInput = () => {
    switch (column.type) {
      case 'select':
        // İleride buraya SelectBox gelecek
        return (
          <select
            value={value}
            onChange={(e) => onFilterChange?.(column.key, e.target.value)}
          >
            <option value="">{column.label}</option>
            {column.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );

      case 'date':
      case 'datetime':
        // İleride buraya DatePicker gelecek
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onFilterChange?.(column.key, e.target.value)}
          />
        );

      case 'number':
      case 'text':
      default:
        return (
          <Input
            type={column.type === 'number' ? 'number' : 'text'}
            isClearable
            label={column.label}
            value={value}
            variant="ghost"
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