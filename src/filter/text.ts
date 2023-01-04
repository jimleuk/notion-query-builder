import {
  EqualCondition,
  NotEqualCondition,
  ContainCondition,
  NotContainCondition,
  StartsWithCondition,
  EndsWithCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with TextFilter
 */
export type TextFilterCondition =
  | EqualCondition<string>
  | NotEqualCondition<string>
  | ContainCondition<string>
  | NotContainCondition<string>
  | StartsWithCondition<string>
  | EndsWithCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

  /**
 * Possible filter types to be used with TextFilter
 */
export type TextPropertyFilterType = 'title' | 'rich_text' | 'url' | 'email' | 'phone_number';

export type TextPropertyFilterObject<T> = PropertyFilterObject & {
  title?: { [k: string]: T };
  rich_text?: { [k: string]: T };
  url?: { [k: string]: T };
  email?: { [k: string]: T };
  phone_number?: { [k: string]: T };
};

/**
 * JSON representation of the TextFilter
 */
export type TextFilterObject = TextPropertyFilterObject<string | string[]> | TextPropertyFilterObject<boolean>;

/**
 * A text filter condition can be applied to database properties of types "title", "rich_text", "url", "email", and "phone_number".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#text-filter-condition)
 *
 * @example
 * const filter = nob.textFilter('Name', nob.equal('Jim'))
 * const filter = nob.textFilter('Name', nob.equal('My blog title'), 'title')
 * const filter = nob.textFilter('Name', nob.equal('http://notion.com'), 'url')
 * const filter = nob.textFilter('Name', nob.equal('hello@example.com'), 'email')
 * const filter = nob.textFilter('Name', nob.equal('000000000000'), 'phone_number')
 * 
 * @param {string} property the database property
 * @param {TextFilterCondition|TextFilterCondition[]} conditions
 * @param {TextPropertyFilterType} [filterType=rich_text]
 * 
 * @export
 * @class TextFilter
 * @extends {TermFilter}
 */
export class TextFilter extends TermFilter {
  constructor(
    property: string,
    conditions: TextFilterCondition | TextFilterCondition[],
    filterType: TextPropertyFilterType = 'rich_text'
  ) {
    super(property, conditions, filterType);
  }
  /**
   * @returns {TextFilterObject[][]}
   */
  toJson(): TextFilterObject[][] {
    return super.toJson();
  }
}