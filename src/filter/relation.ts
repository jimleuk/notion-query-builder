import {
  ContainCondition,
  NotContainCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with RelationFilter
 */
export type RelationFilterCondition =
  | ContainCondition<string>
  | NotContainCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type RelationPropertyFilterObject<T> = PropertyFilterObject & {
  relation: { [k: string]: T }
};

/**
 * JSON representation of the RelationFilter
 */
export type RelationFilterObject = RelationPropertyFilterObject<string | string[]> | RelationPropertyFilterObject<boolean>;

/**
 * A relation filter condition can be applied to database properties of type "relation".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#relation-filter-condition)
 *
 * @example
 * const filter = nob.relationFilter('user', nob.contains('6c574cee-ca68-41c8-86e0-1b9e992689fb'))
 * 
 * @param {string} property the database property
 * @param {RelationFilterCondition|RelationFilterCondition[]} conditions
 * 
 * @export
 * @class RelationFilter
 * @extends {TermFilter}
 */
export class RelationFilter extends TermFilter {
  constructor(
    property: string,
    conditions: RelationFilterCondition | RelationFilterCondition[],
  ) {
    super(property, conditions, 'relation');
  }
  /**
   * @returns {RelationFilterObject[][]}
   */
  toJson(): RelationFilterObject[][] {
    return super.toJson();
  }
}