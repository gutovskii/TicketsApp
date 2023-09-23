export class PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  count: number;
  totalCount: number;
}
