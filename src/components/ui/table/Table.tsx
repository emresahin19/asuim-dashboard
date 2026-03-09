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
  globalSearchPlaceholder = 'Tum kolonlarda ara...',
  getRowId,
  onSelectionChange,
}: TableProps<T>) => {
  const visibleColumns = useMemo(
    () => columns.filter((column) => column.isVisible !== false),
    [columns],
  );
  const [selectedRowIds, setSelectedRowIds] = useState<Array<string | number>>([]);

  const resolveRowId = (item: T, index: number) => {
    if (getRowId) return getRowId(item, index);
    if (item.id !== undefined) return item.id;
    return index;
  };

  const handleFilterChange = (key: keyof T, value: string) => {
    setTableState(prev => ({
      ...prev,
      page: 1,
      filters: { ...prev.filters, [key]: value }
    }));
    onFilterChange?.(key, value);
  };

  const handleSortChange = (key: keyof T, direction: 'asc' | 'desc') => {
    setTableState(prev => ({ ...prev, sortBy: key, sortOrder: direction }));
    onSortChange?.(key, direction);
  };

  const handlePageChange = (p: number) => {
    setTableState(prev => ({ ...prev, page: p }));
    onPageChange?.(p);
  };

  const handleLimitChange = (limit: number) => {
    setTableState(prev => ({ ...prev, limit, page: 1 }));
    onLimitChange?.(limit);
  };

  const handleGlobalSearchChange = (value: string) => {
    setTableState((prev) => ({
      ...prev,
      page: 1,
      globalSearch: value,
    }));
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

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {enableGlobalSearch && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarSearchWrap}>
            <Input
              className={styles.toolbarSearchInput}
              value={tableState.globalSearch || ''}
              placeholder={globalSearchPlaceholder}
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
          {enableRowSelection && (
            <span className={styles.selectionText}>{selectedRowIds.length} secili</span>
          )}
        </div>
      )}
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-busy={isLoading}>
          <thead>
            <TableHeader
              columns={visibleColumns}
              tableState={tableState}
              onSortChange={handleSortChange}
              enableRowSelection={enableRowSelection}
              isAllRowsSelected={allRowsSelected}
              onToggleAllRows={handleToggleAllRows}
              hasActions={!!renderActionButtons}
            />
          </thead>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={visibleColumns.length + (renderActionButtons ? 1 : 0) + (enableRowSelection ? 1 : 0)} style={{ textAlign: 'center', padding: '2rem' }}>
                  <span role="status" aria-live="polite">Yukleniyor...</span>
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody
              items={items}
              columns={visibleColumns}
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
          )}
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