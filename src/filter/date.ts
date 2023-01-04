import {
  EqualCondition,
  EmptyCondition,
  NotEmptyCondition,
  BeforeCondition,
  OnOrBeforeCondition,
  AfterCondition,
  OnOrAfterCondition,
  PastWeekCondition,
  PastMonthCondition,
  PastYearCondition,
  ThisWeekCondition,
  NextWeekCondition,
  NextMonthCondition,
  NextYearCondition,
} from '../condition';
import { TermFilter } from './filter';
import { TimestampFilterObject } from './types';

/**
 * Possible conditions to be used with DateFilter
 * @export
 */
export type DateFilterCondition =
  | EqualCondition<string | Date>
  | BeforeCondition<string | Date>
  | OnOrBeforeCondition<string | Date>
  | AfterCondition<string | Date>
  | OnOrAfterCondition<string | Date>
  | PastWeekCondition
  | PastMonthCondition
  | PastYearCondition
  | ThisWeekCondition
  | NextWeekCondition
  | NextMonthCondition
  | NextYearCondition
  | EmptyCondition
  | NotEmptyCondition;

export type DateTimestampFilterObject<T> = TimestampFilterObject & {
  date?: { [k: string]: T }
  created_time?: { [k: string]: T }
  last_edited_time?: { [k: string]: T }
};

/**
 * filter type variants for DateFilter
 * 
 * @example
 * const filter = nob.DateFilter('blog', nob.after('2023-01-01'), 'created_time')
 */
export type DateTimestampFilterType = 'date' | 'created_time' | 'last_edited_time';

/**
 * JSON representation of the DateFilter
 */
export type DateFilterObject = DateTimestampFilterObject<string | string[] | Date | Date[]> | DateTimestampFilterObject<boolean> | DateTimestampFilterObject<Record<string, unknown>>;

/**
 * A date filter condition can be applied to database properties of types "date",
 * "created_time", and "last_edited_time".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#date-filter-condition)
 * 
 * @example
 * const filter = nob.dateFilter('published_date', nob.onOrAfter('2023-01-01'))
 * const filter = nob.dateFilter('blog', nob.after('2023-01-01'), 'created_time')
 * const filter = nob.dateFilter('blog', nob.after('2023-01-01'), 'last_edited_time')
 *
 * @param {string} property the database property
 * @param {DateFilterCondition|DateFilterCondition[]} conditions
 * @param {DateTimestampFilterType} [filterType=date]
 * 
 * @export
 * @class DateFilter
 * @extends {TermFilter}
 */
export class DateFilter extends TermFilter {
  constructor(
    property: string,
    conditions: DateFilterCondition | DateFilterCondition[],
    filterType: DateTimestampFilterType = 'date'
  ) {
    super(property, conditions, filterType, 'timestamp');
  }
  transform(conditionObject: { [k: string]: string | Date | boolean }) {
    return Object.keys(conditionObject).reduce((acc, key) => ({
      ...acc,
      [key]: conditionObject[key] instanceof Date ? (conditionObject[key] as Date).toISOString() : conditionObject[key]
    }), {});
  }
  /**
   * @returns {DateFilterObject[][]}
   */
  toJson(): DateFilterObject[][] {
    return super.toJson();
  }
}