import { Filter } from './filter';
import { TextFilter, TextFilterObject } from './text';
import { NumberFilter, NumberFilterObject } from './number';
import { DateFilter, DateFilterObject } from './date';
import { CheckboxFilter, CheckboxFilterObject } from './checkbox';
import { SelectFilter, SelectFilterObject } from './select';
import { MultiSelectFilter, MultiSelectFilterObject } from './multiselect';
import { StatusFilter, StatusFilterObject } from './status';
import { PeopleFilter, PeopleFilterObject } from './people';
import { FilesFilter, FilesFilterObject } from './files';
import { RelationFilter, RelationFilterObject } from './relation';
import { RollUpFilter, RollUpFilterObject } from './rollUp';
import { FormulaFilter, FormulaFilterObject } from './formula';

/**
 * Possible filters to use with Compoundfilter
 */
export type CompoundFilterFilter =
  | TextFilter
  | NumberFilter
  | CheckboxFilter
  | SelectFilter
  | MultiSelectFilter
  | StatusFilter
  | DateFilter
  | PeopleFilter
  | FilesFilter
  | RelationFilter
  | RollUpFilter
  | FormulaFilter;

/**
 * Recursive to allow nesting a CompoundFilter within a CompoundFilter
 */
export type CompoundFilterFilterRecursive =
  | CompoundFilter
  | CompoundFilterFilter;

/**
 * Possible filters objects to return with Compoundfilter
 */
export type CompoundFilterFilterObject =
  | TextFilterObject
  | NumberFilterObject
  | CheckboxFilterObject
  | SelectFilterObject
  | MultiSelectFilterObject
  | StatusFilterObject
  | DateFilterObject
  | PeopleFilterObject
  | FilesFilterObject
  | RelationFilterObject
  | RollUpFilterObject
  | FormulaFilterObject;

/**
 * Recursive to allow nesting a CompoundFilter within a CompoundFilter
 */
export type CompoundFilterObjectRecursive =
  | CompoundFilterFilterObject
  | CompoundFilterObject;

/**
 * JSON representation of CompoundFilter
 */
export type CompoundFilterObject = {
  and?: CompoundFilterObjectRecursive[];
  or?: CompoundFilterObjectRecursive[];
};

/**
 * A compound filter object combines several filter objects together using a logical operator and or or.
 * A compound filter can even be combined within a compound filter, but only up to two nesting levels deep.
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#compound-filter-object)
 * 
 * @todo prevent more than two nesting levels deep
 * 
 * @example
 * const filter = nob.compoundFilter()
 *  .and(nob.checkboxFilter('Write todo list', nob.equal(true))
 *  .or(nob.textFilter('name', nob.contain('Bridge')))
 * 
 * @export
 * @class CompoundFilter
 * @extends {Filter}
 */
export class CompoundFilter extends Filter {
  private andFilters: CompoundFilterFilterRecursive[];
  private orFilters: CompoundFilterFilterRecursive[];

  constructor(
    andFilters: CompoundFilterFilterRecursive[] = [],
    orFilters: CompoundFilterFilterRecursive[] = [],
    filterType = 'compound',
  ) {
    super(filterType);
    this.andFilters = andFilters;
    this.orFilters = orFilters;
  }

  /**
   * Append queries to the "and" list
   * 
   * @param childFilter 
   * @returns {CompoundFilter} allows CompoundFilter to be chainable
   */
  and(childFilter: CompoundFilterFilterRecursive | CompoundFilterFilterRecursive[]) {
    if (!childFilter || (Array.isArray(childFilter) && !childFilter.length)) return this;
    const childFilters = Array.isArray(childFilter) ? childFilter : [childFilter];
    this.andFilters.push(...childFilters);
    return this;
  }

  /**
   * Append queries to the "or" list
   * 
   * @param childFilter 
   * @returns {CompoundFilter} allows CompoundFilter to be chainable
   */
  or(childFilter: CompoundFilterFilterRecursive | CompoundFilterFilterRecursive[]) {
    if (!childFilter || (Array.isArray(childFilter) && !childFilter.length)) return this;
    const childFilters = Array.isArray(childFilter) ? childFilter : [childFilter];
    this.orFilters.push(...childFilters);
    return this;
  }

  /**
   * @returns {CompoundFilterObject}
   */
  toJson() {
    const ands: CompoundFilterObjectRecursive[] = [];
    const childAndCompoundFilters = this.andFilters.filter(filter => filter instanceof CompoundFilter) as CompoundFilter[];
    if (childAndCompoundFilters.length) {
      ands.push(...childAndCompoundFilters.flatMap(filter => filter.toJson()));
    }
    const childAndNonCompoundFilters = this.andFilters.filter(filter => !(filter instanceof CompoundFilter)) as CompoundFilterFilter[];
    if (childAndNonCompoundFilters.length) {
      ands.push(...childAndNonCompoundFilters.flatMap(filter => (
        filter.toJson().flatMap(filterObject => filterObject.flatMap(x => x))
      )));
    }

    const ors: CompoundFilterObjectRecursive[] = [];
    const childOrCompoundFilters = this.orFilters.filter(filter => filter instanceof CompoundFilter) as CompoundFilter[];
    if (childOrCompoundFilters.length) {
      ors.push(...childOrCompoundFilters.flatMap(filter => filter.toJson()));
    }
    const childOrNonCompoundFilters = this.orFilters.filter(filter => !(filter instanceof CompoundFilter)) as CompoundFilterFilter[];
    if (childOrNonCompoundFilters.length) {
      ors.push(...childOrNonCompoundFilters.flatMap(filter => (
        filter.toJson().flatMap(filterObject => filterObject.flatMap(x => x))
      )));
    }

    const retVal: {
      and?: CompoundFilterObjectRecursive[];
      or?: CompoundFilterObjectRecursive[];
    } = {};
    if (ands.length) retVal.and = ands;
    if (ors.length) retVal.or = ors;
    return retVal;
  }
}