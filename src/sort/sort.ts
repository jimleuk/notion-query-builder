import { SortDirection, SortTimeType } from './types';

export class Sort<T> {
  constructor(
    private property: string | SortTimeType,
    private direction: SortDirection = 'descending'
  ) {}

  toJson(): T {
    if (this.property === 'created_time' || this.property === 'last_edited_time') {
      return { timestamp: this.property, direction: this.direction } as T;
    }
    return { property: this.property, direction: this.direction } as T;
  }
}