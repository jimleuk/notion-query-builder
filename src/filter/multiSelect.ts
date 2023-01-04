import {
  ContainCondition,
  NotContainCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with MultiSelectFilter
 */
export type MultiSelectFilterCondition =
  | ContainCondition<string>
  | NotContainCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type MultiSelectPropertyFilterObject<T> = PropertyFilterObject & {
  multi_select: { [k: string]: T }
};

/**
 * JSON representation of the MultiSelectFilter
 */
export type MultiSelectFilterObject = MultiSelectPropertyFilterObject<string | string[]> | MultiSelectPropertyFilterObject<boolean>;

/**
 * A multi-select filter condition can be applied to database properties of type "multi_select".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#multi-select-filter-condition)
 *
 * @example
 * const filter = nob.multiSelectFilter('fruits', nob.equal('apple'))
 * const filter = nob.multiSelectFilter('fruits', nob.equal(['apple', 'pear']))
 * 
 * @param {string} property the database property
 * @param {MultiSelectFilterCondition|MultiSelectFilterCondition[]} conditions
 * 
 * @export
 * @class MultiSelectFilter
 * @extends {TermFilter}
 */
export class MultiSelectFilter extends TermFilter {
  constructor(
    property: string,
    conditions: MultiSelectFilterCondition | MultiSelectFilterCondition[],
  ) {
    super(property, conditions, 'multi_select');
  }
  /**
   * 
   * @returns {MultiSelectFilterObject[][]}
   */
  toJson(): MultiSelectFilterObject[][] {
    return super.toJson();
  }
}