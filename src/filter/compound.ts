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

export type CompoundFilterFilterRecursive =
  | CompoundFilter
  | CompoundFilterFilter;

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

export type CompoundFilterObjectRecursive =
  | CompoundFilterFilterObject
  | CompoundFilterObject;

export type CompoundFilterObject = {
  and?: CompoundFilterObjectRecursive[];
  or?: CompoundFilterObjectRecursive[];
};  

export class CompoundFilter extends Filter {
  constructor(
    private andFilters: CompoundFilterFilterRecursive[] = [],
    private orFilters: CompoundFilterFilterRecursive[] = [],
    filterType = 'compound',
  ) {
    super(filterType);
  }

  and(childFilter: CompoundFilterFilterRecursive | CompoundFilterFilterRecursive[]) {
    if (!childFilter || (Array.isArray(childFilter) && !childFilter.length)) return this;
    const childFilters = Array.isArray(childFilter) ? childFilter : [childFilter];
    this.andFilters.push(...childFilters);
    return this;
  }

  or(childFilter: CompoundFilterFilterRecursive | CompoundFilterFilterRecursive[]) {
    if (!childFilter || (Array.isArray(childFilter) && !childFilter.length)) return this;
    const childFilters = Array.isArray(childFilter) ? childFilter : [childFilter];
    this.orFilters.push(...childFilters);
    return this;
  }

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