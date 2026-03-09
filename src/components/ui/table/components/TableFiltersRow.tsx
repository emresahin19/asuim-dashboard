"use client";

import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { TableColumn, TableState } from '../table.types';
import styles from '../table.module.scss';

interface FiltersRowProps<T> {
  columns: TableColumn<T>[];
  tableState: TableState<T>;
  onFilterChange?: (key: keyof T, value: string) => void;
}

const RANGE_SEPARATOR = '..';

const normalizeDate = (value: Date | undefined) => {
  if (!value) return '';
  return value.toISOString();
};

const resolveFilterType = <T,>(column: TableColumn<T>) => {
  if (column.filterType) return column.filterType;
  if (column.type === 'number') return 'numberRange';
  if (column.type === 'date' || column.type === 'datetime') return 'dateRange';
  if (column.type === 'select') return 'select';
  return 'text';
};

export const TableFiltersRow = <T,>({
  columns,
  tableState,
  onFilterChange,
}: FiltersRowProps<T>) => {
  const visibleColumns = columns.filter((column) => column.isVisible !== false);
  const hasAnyFilter = visibleColumns.some((column) => column.filterable);

  if (!hasAnyFilter) {
    return null;
  }

  return (
    <div className={styles.toolbarFilters}>
      {visibleColumns.map((column) => {
        const currentValue = String(tableState.filters[column.key] ?? '');

        if (!column.filterable) {
          return null;
        }

        const filterType = resolveFilterType(column);

        if (filterType === 'select' || filterType === 'multiSelect') {
          const currentValues = filterType === 'multiSelect'
            ? currentValue.split(',').map((entry) => entry.trim()).filter(Boolean)
            : [];
          const selectedOption = column.options?.find((opt) => String(opt.value) === currentValue);
          const selectedMulti = (column.options || []).filter((opt) => currentValues.includes(String(opt.value)));

          return (
            <div key={`filter-${String(column.key)}`} className={styles.toolbarFilterItem}>
              <Select
                options={column.options || []}
                isMulti={filterType === 'multiSelect'}
                value={filterType === 'multiSelect' ? selectedMulti : selectedOption || null}
                placeholder={column.filterPlaceholder || `${column.label} sec`}
                isClearable
                onChange={(value) => {
                  if (filterType === 'multiSelect') {
                    if (!Array.isArray(value)) {
                      onFilterChange?.(column.key, '');
                      return;
                    }

                    onFilterChange?.(
                      column.key,
                      value.map((entry) => String(entry.value)).join(','),
                    );
                    return;
                  }

                  if (Array.isArray(value)) {
                    onFilterChange?.(column.key, value[0] ? String(value[0].value) : '');
                    return;
                  }

                  onFilterChange?.(column.key, value ? String(value.value) : '');
                }}
              />
            </div>
          );
        }

        if (filterType === 'date') {
          return (
            <div key={`filter-${String(column.key)}`} className={styles.toolbarFilterItem}>
              <DatePicker
                value={currentValue ? new Date(currentValue) : undefined}
                placeholder={column.filterPlaceholder || `${column.label} sec`}
                onChange={(date) => onFilterChange?.(column.key, date instanceof Date ? normalizeDate(date) : '')}
              />
            </div>
          );
        }

        if (filterType === 'dateRange') {
          const [fromValue, toValue] = currentValue.split(RANGE_SEPARATOR);

          return (
            <div key={`filter-${String(column.key)}`} className={`${styles.toolbarFilterItem} ${styles.toolbarFilterRange}`}>
              <div className={styles.rangeGrid}>
                <DatePicker
                  value={{
                    from: fromValue ? new Date(fromValue) : undefined,
                    to: toValue ? new Date(toValue) : undefined,
                  }}
                  mode="range"
                  onChange={(dates) => {
                    if (!dates || !('from' in dates) || !('to' in dates)) return;
                    const nextFrom = dates.from instanceof Date ? normalizeDate(dates.from) : '';
                    const nextTo = dates.to instanceof Date ? normalizeDate(dates.to) : '';
                    onFilterChange?.(column.key, `${nextFrom}${RANGE_SEPARATOR}${nextTo}`);
                  }}
                />
              </div>
            </div>
          );
        }

        if (filterType === 'numberRange') {
          const [minValue, maxValue] = currentValue.split(RANGE_SEPARATOR);

          return (
            <div key={`filter-${String(column.key)}`} className={`${styles.toolbarFilterItem} ${styles.toolbarFilterRange}`}>
              <div className={styles.rangeGrid}>
                <Input
                  type="number"
                  value={minValue || ''}
                  placeholder="Min"
                  onChange={(event) =>
                    onFilterChange?.(column.key, `${event.target.value}${RANGE_SEPARATOR}${maxValue || ''}`)
                  }
                />
                <Input
                  type="number"
                  value={maxValue || ''}
                  placeholder="Max"
                  onChange={(event) =>
                    onFilterChange?.(column.key, `${minValue || ''}${RANGE_SEPARATOR}${event.target.value}`)
                  }
                />
              </div>
            </div>
          );
        }

        return (
          <div key={`filter-${String(column.key)}`} className={styles.toolbarFilterItem}>
            <Input
              type="text"
              value={currentValue}
              isClearable
              placeholder={column.filterPlaceholder || `${column.label} ara`}
              onChange={(event) => onFilterChange?.(column.key, event.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
};
