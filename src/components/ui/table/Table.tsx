'use client';

import { useEffect, useMemo, useState } from 'react';
import { TableProps } from './table.types';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import { TablePagination } from './components/TablePagination';
import { TableFiltersRow } from './components/TableFiltersRow';
import { Input } from '../input';
import styles from './table.module.scss';

export const Table = <T extends { id?: string | number }>({
  items,
  columns,
  tableState,
  setTableState,
  isLoading = false,
  className = '',
  onFilterChange,
  onSortChange,
  onPageChange,
  onLimitChange,
  onEditChange,
  onEditSave,
  onEditCancel,
  renderActionButtons,
  renderExpandedRow,
  enableRowSelection = true,
  enableGlobalSearch = true,
  globalSearchFields,
  globalSearchPlaceholder,
  getRowId,
  onSelectionChange,
}: TableProps<T>) => {
  const visibleColumns = useMemo(
    () => columns.filter((column) => column.isVisible !== false),
    [columns],
  );
  const [selectedRowIds, setSelectedRowIds] = useState<Array<string | number>>([]);
  const [globalSearchInput, setGlobalSearchInput] = useState<string>(tableState.globalSearch || '');

  const resolvedGlobalSearchLabels = useMemo(() => {
    if (!globalSearchFields || globalSearchFields.length === 0) return [];

    const labels = globalSearchFields.map((field) => {
      const relatedColumn = columns.find((column) => column.key === field);
      return relatedColumn?.label || String(field);
    });

    return Array.from(new Set(labels));
  }, [columns, globalSearchFields]);

  const resolvedGlobalSearchPlaceholder = useMemo(() => {
    if (globalSearchPlaceholder) return globalSearchPlaceholder;
    if (resolvedGlobalSearchLabels.length === 0) return 'Tum kolonlarda ara...';

    return `${resolvedGlobalSearchLabels.join(', ')} icin ara...`;
  }, [globalSearchPlaceholder, resolvedGlobalSearchLabels]);


  const resolveRowId = (item: T, index: number) => {
    if (getRowId) return getRowId(item, index);
    if (item.id !== undefined) return item.id;
    return index;
  };

  const handleFilterChange = (key: keyof T, value: string) => {
    setTableState((prev) => ({
      ...prev,
      page: 1,
      filters: { ...prev.filters, [key]: value },
    }));
    onFilterChange?.(key, value);
  };

  const handleSortChange = (key: keyof T, direction: 'asc' | 'desc' | undefined) => {
    setTableState((prev) => ({
      ...prev,
      sortBy: direction ? key : undefined,
      sortOrder: direction,
    }));
    onSortChange?.(key, direction);
  };

  const handlePageChange = (p: number) => {
    setTableState((prev) => ({ ...prev, page: p }));
    onPageChange?.(p);
  };

  const handleLimitChange = (limit: number) => {
    setTableState((prev) => ({ ...prev, limit, page: 1 }));
    onLimitChange?.(limit);
  };

  const handleGlobalSearchChange = (value: string) => {
    setGlobalSearchInput(value);
  };

  const handleToggleRow = (item: T, index: number, checked: boolean) => {
    const rowId = resolveRowId(item, index);

    setSelectedRowIds((prev) => {
      if (checked) {
        return prev.includes(rowId) ? prev : [...prev, rowId];
      }
      return prev.filter((id) => id !== rowId);
    });
  };

  const handleToggleAllRows = (checked: boolean) => {
    if (!checked) {
      setSelectedRowIds([]);
      return;
    }

    setSelectedRowIds(items.map((item, index) => resolveRowId(item, index)));
  };

  const allRowsSelected = items.length > 0 && selectedRowIds.length === items.length;

  useEffect(() => {
    const currentIds = items.map((item, index) => resolveRowId(item, index));
    const idSet = new Set(currentIds);
    setSelectedRowIds((prev) => prev.filter((id) => idSet.has(id)));
  }, [items]);

  useEffect(() => {
    if (!onSelectionChange) return;
    const selectedItems = items.filter((item, index) => selectedRowIds.includes(resolveRowId(item, index)));
    onSelectionChange(selectedItems);
  }, [items, onSelectionChange, selectedRowIds]);

  useEffect(() => {
    setGlobalSearchInput(tableState.globalSearch || '');
  }, [tableState.globalSearch]);

  useEffect(() => {
    const committedSearch = tableState.globalSearch || '';
    if (globalSearchInput === committedSearch) return;

    const timeoutId = window.setTimeout(() => {
      setTableState((prev) => {
        if ((prev.globalSearch || '') === globalSearchInput) return prev;
        return {
          ...prev,
          page: 1,
          globalSearch: globalSearchInput,
        };
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [globalSearchInput, setTableState, tableState.globalSearch]);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {enableGlobalSearch && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarSearchWrap}>
            <Input
              className={styles.toolbarSearchInput}
              value={globalSearchInput}
              placeholder={resolvedGlobalSearchPlaceholder}
              size="sm"
              isClearable
              onChange={(event) => handleGlobalSearchChange(event.target.value)}
            />
          </div>
          <TableFiltersRow
            columns={visibleColumns}
            tableState={tableState}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-busy={isLoading}>
          <TableHeader
            columns={visibleColumns}
            tableState={tableState}
            onSortChange={handleSortChange}
            enableRowSelection={enableRowSelection}
            isAllRowsSelected={allRowsSelected}
            onToggleAllRows={handleToggleAllRows}
            hasActions={!!renderActionButtons}
          />
          <TableBody
            items={items}
            columns={visibleColumns}
            tableState={tableState}
            isLoading={isLoading}
            onEditChange={onEditChange}
            onEditSave={onEditSave}
            onEditCancel={onEditCancel}
            renderActionButtons={renderActionButtons}
            renderExpandedRow={renderExpandedRow}
            enableRowSelection={enableRowSelection}
            selectedRowIds={selectedRowIds}
            getRowId={resolveRowId}
            onRowSelectionChange={handleToggleRow}
          />
        </table>
      </div>
      <TablePagination
        tableState={tableState}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  );
};
