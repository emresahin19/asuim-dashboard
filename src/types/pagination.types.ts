export type SortOrder = 'asc' | 'desc';

export type PaginationQuery = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: SortOrder | string;
};

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginatedResponse<TItem, TFilters = Record<string, unknown>> = {
  items: TItem[];
  meta: PageMeta;
  filters: TFilters;
};
