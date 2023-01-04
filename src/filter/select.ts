import {
  EqualCondition,
  NotEqualCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with SelectFilter
 */
export type SelectFilterCondition =
  | EqualCondition<string>
  | NotEqualCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type SelectPropertyFilterObject<T> = PropertyFilterObject & {
  select: { [k: string]: T }
};

/**
 * JSON representation of the SelectFilter
 */
export type SelectFilterObject = SelectPropertyFilterObject<string | string[]> | SelectPropertyFilterObject<boolean>;

/**
 * A select filter condition can be applied to database properties of type "select".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#select-filter-condition)
 *
 * @example
 * const filter = nob.selectFilter('assignee', nob.eq('Jim'))
 * 
 * @param {string} property the database property
 * @param {SelectFilterCondition|SelectFilterCondition[]} conditions
 * 
 * @export
 * @class SelectFilter
 * @extends {TermFilter}
 */
export class SelectFilter extends TermFilter {
  constructor(
    property: string,
    conditions: SelectFilterCondition | SelectFilterCondition[],
  ) {
    super(property, conditions, 'select');
  }
  /**
   * @returns {SelectFilterObject[][]}
   */
  toJson(): SelectFilterObject[][] {
    return super.toJson();
  }
}
