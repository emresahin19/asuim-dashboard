'use client';

import { TableProps } from './table.types';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import { TablePagination } from './components/TablePagination';
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
  onPerPageChange,
  onEditChange,
  onEditSave,
  onEditCancel,
  renderActionButtons,
  renderExpandedRow,
}: TableProps<T>) => {

  // State Updates Wrapper (Optional: URL Sync burada yapılabilir)
  const handleFilterChange = (key: keyof T, value: string) => {
    setTableState(prev => ({
      ...prev,
      page: 1, // Filtre değişince sayfa 1'e dönmeli
      filters: { ...prev.filters, [key]: value }
    }));
    onFilterChange?.(key, value);
  };

  const handleSortChange = (key: keyof T, direction: 'ASC' | 'DESC') => {
    setTableState(prev => ({ ...prev, orderBy: key, orderDirection: direction }));
    onSortChange?.(key, direction);
  };

  const handlePageChange = (p: number) => {
    setTableState(prev => ({ ...prev, page: p }));
    onPageChange?.(p);
  };

  const handlePerPageChange = (pp: number) => {
    setTableState(prev => ({ ...prev, perPage: pp, page: 1 }));
    onPerPageChange?.(pp);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <TableHeader
            columns={columns}
            tableState={tableState}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            hasActions={!!renderActionButtons}
          />
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length + (renderActionButtons ? 1 : 0)} style={{ textAlign: 'center', padding: '2rem' }}>
                  Yükleniyor...
                </td>
              </tr>
            </tbody>
          ) : (
            <TableBody
              items={items}
              columns={columns}
              onEditChange={onEditChange}
              onEditSave={onEditSave}
              onEditCancel={onEditCancel}
              renderActionButtons={renderActionButtons}
              renderExpandedRow={renderExpandedRow}
            />
          )}
        </table>
      </div>
      <TablePagination
        tableState={tableState}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};