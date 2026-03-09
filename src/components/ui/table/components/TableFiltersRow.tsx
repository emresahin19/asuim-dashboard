"use client";

import { RefObject, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useClickOutside } from '@/hooks/useClickOutside';
import { clsx } from '@/utils';
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
  const [openFilterKey, setOpenFilterKey] = useState<keyof T | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const visibleColumns = columns.filter((column) => column.isVisible !== false);
  const hasAnyFilter = visibleColumns.some((column) => column.filterable);

  useClickOutside(filtersRef as RefObject<HTMLDivElement>, () => {
    setOpenFilterKey(null);
  });

  const isFilterActive = (value: string, filterType: ReturnType<typeof resolveFilterType>) => {
    if (!value) return false;

    if (filterType === 'numberRange' || filterType === 'dateRange') {
      const [fromValue, toValue] = value.split(RANGE_SEPARATOR);
      return Boolean(fromValue || toValue);
    }

    return true;
  };

  if (!hasAnyFilter) {
    return null;
  }

  return (
    <div ref={filtersRef} className={styles.toolbarFilters}>
      {visibleColumns.map((column) => {
        const currentValue = String(tableState.filters[column.key] ?? '');

        if (!column.filterable) {
          return null;
        }

        const filterType = resolveFilterType(column);
        const isOpen = openFilterKey === column.key;
        const active = isFilterActive(currentValue, filterType);

        const renderFilterControl = () => {
          if (filterType === 'select' || filterType === 'multiSelect') {
            const currentValues = filterType === 'multiSelect'
              ? currentValue.split(',').map((entry) => entry.trim()).filter(Boolean)
              : [];
            const selectedOption = column.options?.find((opt) => String(opt.value) === currentValue);
            const selectedMulti = (column.options || []).filter((opt) => currentValues.includes(String(opt.value)));

            return (
              <Select
                options={column.options || []}
                className={styles.filterInput}
                isMulti={filterType === 'multiSelect'}
                variant={'lite'}
                value={filterType === 'multiSelect' ? selectedMulti : selectedOption || null}
                placeholder={column.filterPlaceholder || `${column.label} sec`}
                isClearable
                size='sm'
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
            );
          }

          if (filterType === 'date') {
            return (
              <DatePicker
                className={styles.filterInput}
                value={currentValue ? new Date(currentValue) : undefined}
                placeholder={column.filterPlaceholder || `${column.label} sec`}
                onChange={
                  (date) => onFilterChange?.(column.key, date instanceof Date ? normalizeDate(date) : '')
                }
              />
            );
          }

          if (filterType === 'dateRange') {
            const [fromValue, toValue] = currentValue.split(RANGE_SEPARATOR);

            return (
              <DatePicker
                className={styles.filterInput}
                value={{
                  from: fromValue ? new Date(fromValue) : undefined,
                  to: toValue ? new Date(toValue) : undefined,
                }}
                mode="range"
                onChange={(dates) => {
                  if (!dates || !('from' in dates) || !('to' in dates)) {
                    onFilterChange?.(column.key, '');
                    return;
                  }
                  const nextFrom = dates.from instanceof Date ? normalizeDate(dates.from) : '';
                  const nextTo = dates.to instanceof Date ? normalizeDate(dates.to) : '';
                  onFilterChange?.(column.key, `${nextFrom}${RANGE_SEPARATOR}${nextTo}`);
                }}
              />
            );
          }

          if (filterType === 'numberRange') {
            const [minValue, maxValue] = currentValue.split(RANGE_SEPARATOR);

            return (
              <div className={styles.rangeGrid}>
                <Input
                  className={styles.filterInput}
                  type="number"
                  value={minValue || ''}
                  placeholder="Min"
                  size="sm"
                  onChange={(event) =>
                    onFilterChange?.(column.key, `${event.target.value}${RANGE_SEPARATOR}${maxValue || ''}`)
                  }
                />
                <Input
                  className={styles.filterInput}
                  type="number"
                  value={maxValue || ''}
                  placeholder="Max"
                  size="sm"
                  onChange={(event) =>
                    onFilterChange?.(column.key, `${minValue || ''}${RANGE_SEPARATOR}${event.target.value}`)
                  }
                />
              </div>
            );
          }

          return (
            <Input
              className={styles.filterInput}
              type="text"
              value={currentValue}
              size="sm"
              isClearable
              placeholder={column.filterPlaceholder || `${column.label} ara`}
              onChange={(event) => onFilterChange?.(column.key, event.target.value)}
            />
          );
        };

        return (
          <div
            key={`filter-${String(column.key)}`}
            className={clsx(
              styles.toolbarFilterItem,
              styles.toolbarFilterDropdown,
              (filterType === 'numberRange' || filterType === 'dateRange') && styles.toolbarFilterRange,
              isOpen && styles.toolbarFilterDropdownOpen,
            )}
          >
            <Button
              type="button"
              size="sm"
              variant={active ? 'soft' : 'outline'}
              color={active ? 'primary' : 'neutral'}
              className={styles.toolbarFilterTrigger}
              onClick={() => {
                setOpenFilterKey((prev) => (prev === column.key ? null : column.key));
              }}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
            >
              {column.label}
            </Button>

            {isOpen ? (
              <div className={styles.toolbarFilterDropdownMenu} role="dialog" aria-label={`${column.label} filtre`}>
                {renderFilterControl()}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
