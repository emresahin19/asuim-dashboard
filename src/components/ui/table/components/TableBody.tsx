import React, { useState } from 'react';
import Check from '@/components/ui/icon/icons/Check';
import X from '@/components/ui/icon/icons/X';
import { TableColumn, TableProps } from '../table.types';
import styles from '../table.module.scss';
import { Icon } from '@/components/ui/icon';
import { Checkbox } from '@/components/ui/checkbox';

type BodyProps<T> = Pick<TableProps<T>, 'items' | 'columns' | 'onEditChange' | 'onEditSave' | 'onEditCancel' | 'renderActionButtons' | 'renderExpandedRow'> & {
  enableRowSelection: boolean;
  selectedRowIds: Array<string | number>;
  getRowId: (item: T, index: number) => string | number;
  onRowSelectionChange: (item: T, index: number, checked: boolean) => void;
};

export const TableBody = <T,>({
  items,
  columns,
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

  const toggleExpand = (item: T, index: number) => {
    const id = getRowId(item, index);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <tbody>
      {items.length === 0 ? (
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
                  {col.editable ? (
                    <div className={styles.editWrapper}>
                      <input
                        className={styles.nativeInput}
                        value={item[col.key] as string}
                        type={col.type === 'number' ? 'number' : 'text'}
                        aria-label={`${String(col.label)} alanını düzenle`}
                        onChange={(e) => onEditChange?.(item, e.target.value)}
                      />
                      <div className={styles.editActions}>
                        <button className={styles.pageBtn} aria-label="Değişikliği kaydet" onClick={(e) => { e.stopPropagation(); onEditSave?.(item); }}>
                          <Icon
                            size={14}
                            icon={Check}
                            decorative
                          />
                        </button>
                        <button className={styles.pageBtn} aria-label="Düzenlemeyi iptal et" onClick={(e) => { e.stopPropagation(); onEditCancel?.(item); }}>
                          <Icon
                            size={14}
                            icon={X}
                            decorative
                          />
                        </button>
                      </div>
                    </div>
                  ) : (
                    col.render ? col.render(item) : item[col.key]
                  )}
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
        )})
      )}
    </tbody>
  );
};