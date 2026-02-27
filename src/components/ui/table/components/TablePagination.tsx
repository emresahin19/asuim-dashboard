import React, { useMemo } from 'react';
import ChevronLeft from '@/components/ui/icon/icons/ChevronLeft'
import ChevronRight from '@/components/ui/icon/icons/ChevronRight'
import Ellipsis from '@/components/ui/icon/icons/Ellipsis'
import { TableState } from '../table.types';
import styles from '../table.module.scss';
import { Icon } from '@/components/ui/icon';
import { SelectLite } from '../../select-lite';

interface PaginationProps<T> {
  tableState: TableState<T>;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export const TablePagination = <T,>({ tableState, onPageChange, onPerPageChange }: PaginationProps<T>) => {
  const { page, perPage, total = 0 } = tableState;
  const totalPages = Math.ceil(total / perPage);

  const pages = useMemo(() => {
    const list: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) list.push(i);
    } else {
      list.push(1);
      if (page > 3) list.push('...');
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) list.push(i);
      if (page < totalPages - 2) list.push('...');
      list.push(totalPages);
    }
    return list;
  }, [page, totalPages]);

  if (total === 0) return null;

  return (
    <div className={styles.pagination}>
      <div className={styles.controls}>
        <span>Toplam: <strong>{total}</strong> kayıt</span>

        <SelectLite
          size="sm"
          label="Sayfa başına kayıt"
          className={styles.perPageSelect}
          options={[
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
          ]}
          value={perPage}
          onChange={(e) => onPerPageChange?.(Number(e.target.value))} // Native event döner!
        />
      </div>

      <div className={styles.pages}>
        <button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Önceki sayfa"
        >
          <Icon
            size={16}
            icon={ChevronLeft}
            decorative
          />
        </button>

        {pages.map((p, i) => (
          p === '...' ? (
            <span key={`ellipsis-${i}`} style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
              <Icon
                size={14}
                icon={Ellipsis}
                decorative
              />
            </span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
              onClick={() => onPageChange?.(Number(p))}
              aria-label={`${p}. sayfaya git`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        ))}

        <button
          className={styles.pageBtn}
          disabled={page === totalPages}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Sonraki sayfa"
        >
          <Icon
            size={14}
            icon={ChevronRight}
            decorative
          />
        </button>
      </div>
    </div>
  );
};