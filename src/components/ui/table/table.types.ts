export type SortOrder = 'ASC' | 'DESC';

export interface TableState<T> {
  page: number;
  perPage: number;
  total?: number;
  orderBy: keyof T | undefined;
  orderDirection: SortOrder | undefined;
  filters: Record<keyof T, string>;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  icon?: React.ReactNode;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'datetime' | 'select';
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
  onSortChange?: (key: keyof T, value: SortOrder) => void;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  onEditChange?: (item: T, value: string) => void;
  onEditSave?: (item: T) => void;
  onEditCancel?: (item: T) => void;
  renderActionButtons?: (item: T) => React.ReactNode;
  renderExpandedRow?: (item: T) => React.ReactNode;
}