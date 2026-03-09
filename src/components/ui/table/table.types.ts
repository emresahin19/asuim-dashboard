import type { SortOrder } from '@/types';

export type TableFilters<T> = Partial<Record<keyof T, string>>;
export type TableRowId = string | number;
export type TableFilterType =
  | 'text'
  | 'number'
  | 'numberRange'
  | 'date'
  | 'dateRange'
  | 'select'
  | 'multiSelect';

export interface TableState<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  sortBy: keyof T | string | undefined;
  sortOrder: SortOrder | undefined;
  filters: TableFilters<T>;
  globalSearch?: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  icon?: React.ReactNode;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'datetime' | 'select';
  filterType?: TableFilterType;
  filterPlaceholder?: string;
  options?: { label: string; value: string | number }[];
  editable?: boolean;
  filterable?: boolean;
  isVisible?: boolean; // 'show' yerine isVisible daha semantic
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  items: T[];
  columns: TableColumn<T>[];
  tableState: TableState<T>;
  setTableState: React.Dispatch<React.SetStateAction<TableState<T>>>;
  isLoading?: boolean;
  className?: string;
  onFilterChange?: (key: keyof T, value: string) => void;
  onSortChange?: (key: keyof T, value: SortOrder | undefined) => void;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onEditChange?: (item: T, value: string) => void;
  onEditSave?: (item: T) => void;
  onEditCancel?: (item: T) => void;
  renderActionButtons?: (item: T) => React.ReactNode;
  renderExpandedRow?: (item: T) => React.ReactNode;
  enableRowSelection?: boolean;
  enableGlobalSearch?: boolean;
  globalSearchFields?: Array<keyof T>;
  globalSearchPlaceholder?: string;
  getRowId?: (item: T, index: number) => TableRowId;
  onSelectionChange?: (rows: T[]) => void;
}