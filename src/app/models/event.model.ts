export interface EventSocket<T> {
  topico: string;
  tipo: string;
  payload: Array<T> | T;
}
