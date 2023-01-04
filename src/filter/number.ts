import {
  EqualCondition,
  NotEqualCondition,
  EmptyCondition,
  NotEmptyCondition,
  GreaterThanCondition,
  GreaterThanOrEqualToCondition,
  LessThanCondition,
  LessThanOrEqualToCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with NumberFilter
 */
export type NumberFilterCondition =
  | EqualCondition<number>
  | NotEqualCondition<number>
  | GreaterThanCondition<number>
  | GreaterThanOrEqualToCondition<number>
  | LessThanCondition<number>
  | LessThanOrEqualToCondition<number>
  | EmptyCondition
  | NotEmptyCondition;

export type NumberPropertyFilterObject<T> = PropertyFilterObject & {
  number: { [k: string]: T }
};

/**
 * JSON representation of the NumberFilter
 */
export type NumberFilterObject = NumberPropertyFilterObject<number | number[]> | NumberPropertyFilterObject<boolean>;

/**
 * A number filter condition can be applied to database properties of type "number".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#number-filter-condition)
 *
 * @example
 * const filter = nob.numberFilter('age', nob.equal(12))
 * const filter = nob.numberFilter('age', nob.greaterThan(12))
 * 
 * @param {string} property the database property
 * @param {NumberFilterCondition|NumberFilterCondition[]} conditions
 * 
 * @export
 * @class NumberFilter
 * @extends {TermFilter}
 */
export class NumberFilter extends TermFilter {
  constructor(
    property: string,
    conditions: NumberFilterCondition | NumberFilterCondition[],
  ) {
    super(property, conditions, 'number');
  }
  /**
   * @returns {NumberFilterObject[][]}
   */
  toJson(): NumberFilterObject[][] {
    return super.toJson();
  }
}