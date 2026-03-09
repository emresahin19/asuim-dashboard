import React, { useState } from 'react';
import { TableProps, TableState } from '../table.types';
import styles from '../table.module.scss';
import { Checkbox } from '@/components/ui/checkbox';

type BodyProps<T> = Pick<TableProps<T>, 'items' | 'columns' | 'onEditChange' | 'onEditSave' | 'onEditCancel' | 'renderActionButtons' | 'renderExpandedRow'> & {
  enableRowSelection: boolean;
  tableState: TableState<T>;
  isLoading?: boolean;
  selectedRowIds: Array<string | number>;
  getRowId: (item: T, index: number) => string | number;
  onRowSelectionChange: (item: T, index: number, checked: boolean) => void;
};

export const TableBody = <T,>({
  items,
  columns,
  tableState,
  isLoading,
  onEditChange,
  onEditSave,
  onEditCancel,
  renderActionButtons,
  renderExpandedRow,
  enableRowSelection,
  selectedRowIds,
  getRowId,
  onRowSelectionChange,
}: BodyProps<T>) => {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const skeletonRowCount = Math.max(1, tableState.limit || 10);

  const toggleExpand = (item: T, index: number) => {
    const id = getRowId(item, index);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <tbody>
      {isLoading ? (Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
        <tr key={`skeleton-row-${rowIndex}`} className={styles.skeletonRow} aria-hidden="true">
          {enableRowSelection && (
            <td className={styles.checkboxCol}>
              <span className={styles.skeletonBlock} style={{ width: '1rem' }} />
            </td>
          )}
          {columns.map((column) => (
            <td key={`skeleton-${String(column.key)}-${rowIndex}`}>
              <span className={styles.skeletonBlock} />
            </td>
          ))}
          {renderActionButtons && (
            <td>
              <span className={styles.skeletonBlock} style={{ width: '4rem' }} />
            </td>
          )}
        </tr>
      ))) : items.length === 0 ? (
        <tr>
          <td colSpan={columns.length + (renderActionButtons ? 1 : 0) + (enableRowSelection ? 1 : 0)} style={{ textAlign: 'center', padding: '2rem' }}>
            Veri bulunamadı.
          </td>
        </tr>
      ) : (
        items.map((item, idx) => {
          const rowId = getRowId(item, idx);
          const isSelected = selectedRowIds.includes(rowId);

          return (
            <React.Fragment key={rowId}>
              <tr onClick={() => renderExpandedRow && toggleExpand(item, idx)}>
                {enableRowSelection && (
                  <td className={styles.checkboxCol} onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => onRowSelectionChange(item, idx, event.target.checked)}
                      aria-label="Satiri sec"
                    />
                  </td>
                )}
                {columns.map((col) => col.isVisible !== false && (
                  <td key={String(col.key)}>
                    {col.render ? col.render(item) : String(item[col.key])}
                  </td>
                ))}
                {renderActionButtons && (
                  <td>{renderActionButtons(item)}</td>
                )}
              </tr>
              {renderExpandedRow && expandedId === rowId && (
                <tr>
                  <td colSpan={columns.length + (renderActionButtons ? 1 : 0) + (enableRowSelection ? 1 : 0)}>
                    {renderExpandedRow(item)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          )
        })
      )}
    </tbody>
  );
};