import { useMemo } from 'react';
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
  onLimitChange?: (limit: number) => void;
}

export const TablePagination = <T,>({ tableState, onPageChange, onLimitChange }: PaginationProps<T>) => {
  const { page, limit, total } = tableState;
  const totalPages = tableState.totalPages || Math.ceil(total / limit);

  const pages = useMemo(() => {
    const list: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) list.push(i);
      return list;
    }

    // Keep pagination width stable with a fixed 7-slot model.
    if (page <= 4) {
      list.push(1, 2, 3, 4, 5, '...', totalPages);
      return list;
    }

    if (page >= totalPages - 3) {
      list.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      return list;
    }

    list.push(1, '...', page - 1, page, page + 1, '...', totalPages);

    return list;
  }, [page, totalPages]);

  if (total === 0) return null;

  return (
    <div className={styles.pagination}>
      <div className={styles.controls}>
        <span>Total: <strong>{total}</strong> records</span>

        <SelectLite
          size="sm"
          label="Records per page"
          className={styles.perPageSelect}
          options={[
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
          ]}
          value={limit}
          onChange={(e) => onLimitChange?.(Number(e.target.value))}
        />
      </div>

      <div className={styles.pages}>
        <button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous page"
        >
          <Icon
            size={16}
            icon={ChevronLeft}
            decorative
          />
        </button>

        {pages.map((p, i) => (
          p === '...' ? (
            <button
              key={`ellipsis-${i}`}
              type="button"
              className={`${styles.pageBtn} ${styles.ellipsisBtn}`}
              disabled
              aria-hidden
              tabIndex={-1}
            >
              <Icon
                size={14}
                icon={Ellipsis}
                decorative
              />
            </button>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === page ? styles.active : ''}`}
              onClick={() => onPageChange?.(Number(p))}
              aria-label={`Go to page ${p}`}
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
          aria-label="Next page"
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