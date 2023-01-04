import {
  EqualCondition,
  NotEqualCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Allowed conditions for checkboxFilter 
 */
export type CheckboxFilterCondition =
  | EqualCondition<boolean>
  | NotEqualCondition<boolean>;

export type CheckboxPropertyFilterObject<T> = PropertyFilterObject & {
  checkbox: { [k: string]: T }
};

/**
 * JSON representation of the checkboxFilter
 */
export type CheckboxFilterObject = CheckboxPropertyFilterObject<boolean>;

/**
 * A checkbox filter condition can be applied to database properties of type "checkbox".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#checkbox-filter-condition)
 * 
 * @example
 * const filter = nob.checkboxFilter('Write todo list', nob.equal(true))
 * 
 * @param {string} property the database property
 * @param {CheckboxFilterCondition|CheckboxFilterCondition[]} conditions
 *
 * @export
 * @class CheckboxFilter
 * @extends {TermFilter}
 */
export class CheckboxFilter extends TermFilter {
  constructor(
    property: string,
    conditions: CheckboxFilterCondition | CheckboxFilterCondition[],
  ) {
    super(property, conditions, 'checkbox');
  }
  /**
   * @returns {CheckboxFilterObject[][]}
   */
  toJson(): CheckboxFilterObject[][] {
    return super.toJson();
  }
}