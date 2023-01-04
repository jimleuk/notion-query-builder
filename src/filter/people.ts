import {
  ContainCondition,
  NotContainCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * filter type variations for PeopleFilter
 */
 export type PeoplePropertyFilterType = 'people' | 'created_by' | 'last_edited_by';

 /**
 * Possible conditions to be used with PeopleFilter
 */
export type PeopleFilterCondition =
  | ContainCondition<string>
  | NotContainCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type PeoplePropertyFilterObject<T> = PropertyFilterObject & {
  people?: { [k: string]: T }
  created_by?: { [k: string]: T }
  last_edited_by?: { [k: string]: T }
};

/**
 * JSON representation of the PeopleFilter
 */
export type PeopleFilterObject = PeoplePropertyFilterObject<string | string[]> | PeoplePropertyFilterObject<boolean>;

/**
 * A people filter condition can be applied to database properties of types "people", "created_by", and "last_edited_by".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#people-filter-condition)
 *
 * @example
 * const filter = nob.peopleFilter('firstName', nob.equal('Jim'))
 * const filter = nob.peopleFilter('firstName', nob.equal('Jim'), 'created_by')
 * const filter = nob.peopleFilter('firstName', nob.equal('Jim'), 'last_edited_by')
 * 
 * @param {string} property the database property
 * @param {PeopleFilterCondition|PeopleFilterCondition[]} conditions
 * @param {PeoplePropertyFilterType} [filterType=people] 
 * 
 * @export
 * @class PeopleFilter
 * @extends {TermFilter}
 */
export class PeopleFilter extends TermFilter {
  constructor(
    property: string,
    conditions: PeopleFilterCondition | PeopleFilterCondition[],
    filterType: PeoplePropertyFilterType = 'people'
  ) {
    super(property, conditions, filterType);
  }
  /**
   * @returns {PeopleFilterObject[][]}
   */
  toJson(): PeopleFilterObject[][] {
    return super.toJson();
  }
}