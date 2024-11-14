export interface RootListResponse<T> {
  totalDatas: number;
  totalPages: number;
  page: number;
  data: T[];
}
