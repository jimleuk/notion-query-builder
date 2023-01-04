import {
  EqualCondition,
  NotEqualCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with StatusFilter
 */
export type StatusFilterCondition =
  | EqualCondition<string>
  | NotEqualCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type StatusPropertyFilterObject<T> = PropertyFilterObject & {
  status: { [k: string]: T }
};

/**
 * JSON representation of the StatusFilter
 */
export type StatusFilterObject = StatusPropertyFilterObject<string | string[]> | StatusPropertyFilterObject<boolean>;

/**
 * A status filter condition can be applied to database properties of type "status".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#status-filter-condition)
 *
 * @example
 * const filter = nob.statusFilter('status', nob.eq('In Progress'))
 * 
 * @param {string} property the database property
 * @param {StatusFilterCondition|StatusFilterCondition[]} conditions
 * 
 * @export
 * @class StatusFilter
 * @extends {TermFilter}
 */
export class StatusFilter extends TermFilter {
  constructor(
    property: string,
    conditions: StatusFilterCondition | StatusFilterCondition[],
  ) {
    super(property, conditions, 'status');
  }
  /**
   * @returns {StatusFilterObject[][]}
   */
  toJson(): StatusFilterObject[][] {
    return super.toJson();
  }
}