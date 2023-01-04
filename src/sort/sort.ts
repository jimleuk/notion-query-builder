import { SortDirection, SortTimeType } from './types';
/**
 * A sort is a condition used to order the entries returned from a database query.
 * A database query can be sorted by a property and/or timestamp and in a given direction.
 * For example, a library database can be sorted by the "Name of a book" (i.e. property)
 * and in ascending (i.e. direction).
 *
 * @example
 * const sort = nob.sort('published_at')
 * const sort = nob.sort('created_time', 'ascending')
 * const sort = nob.sort('last_edited_time', 'ascending')
 * 
 * @param {string | SortTimeType} property the database field
 * @param {SortDirection} [direction=descending] the sort direction
 * 
 * @export
 * @class Sort
 * @template T
 */
export class Sort<T> {
  private property: string | SortTimeType;
  private direction: SortDirection;

  constructor(
    property: string | SortTimeType,
    direction: SortDirection = 'descending'
  ) {
    this.property = property;
    this.direction = direction;
  }

  /**
   * @returns {SortProperty | SortTime}
   */
  toJson(): T {
    if (this.property === 'created_time' || this.property === 'last_edited_time') {
      return { timestamp: this.property, direction: this.direction } as T;
    }
    return { property: this.property, direction: this.direction } as T;
  }
}