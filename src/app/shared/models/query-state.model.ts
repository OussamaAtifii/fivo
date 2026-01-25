export interface QueryState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
