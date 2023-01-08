'use strict';

import {
  EqualCondition,
  NotEqualCondition,
  ContainCondition,
  NotContainCondition,
  StartsWithCondition,
  EndsWithCondition,
  GreaterThanCondition,
  GreaterThanOrEqualToCondition,
  LessThanCondition,
  LessThanOrEqualToCondition,
  EmptyCondition,
  NotEmptyCondition,
  BeforeCondition,
  OnOrBeforeCondition,
  AfterCondition,
  OnOrAfterCondition,
  PastWeekCondition,
  PastMonthCondition,
  PastYearCondition,
  ThisWeekCondition,
  NextWeekCondition,
  NextMonthCondition,
  NextYearCondition,
} from './condition';

export const equal = <T>(params: T | T[]) => new EqualCondition<T>(params);
export const eq = equal;
export const equals = equal;
export const is = equal;
export const be = equal;
export const notEqual = <T>(params: T | T[]) => new NotEqualCondition<T>(params);
export const neq = notEqual;
export const notEquals = notEqual;
export const isnt = notEqual;
export const isNot = notEqual;
export const contain = <T>(params: T | T[]) => new ContainCondition<T>(params);
export const contains = contain;
export const has = contain;
export const include = contain;
export const includes = contain;
export const notContain = <T>(params: T | T[]) => new NotContainCondition<T>(params);
export const notContains = notContain;
export const doesNotContain = notContain;
export const hasNot = notContain;
export const exclude = notContain;
export const excludes = notContain;
export const startsWith = <T>(params: T | T[]) => new StartsWithCondition<T>(params);
export const endsWith = <T>(params: T | T[]) => new EndsWithCondition<T>(params);
export const greaterThan = <T>(params: T | T[]) => new GreaterThanCondition<T>(params);
export const gt = greaterThan;
export const moreThan = greaterThan;
export const greaterThanOrEqualTo = <T>(params: T | T[]) => new GreaterThanOrEqualToCondition<T>(params);
export const gte = greaterThanOrEqualTo;
export const moreThanOrEqualTo = greaterThanOrEqualTo;
export const lessThan = <T>(params: T | T[]) => new LessThanCondition<T>(params);
export const lt = lessThan;
export const lessThanOrEqualTo = <T>(params: T | T[]) => new LessThanOrEqualToCondition<T>(params);
export const lte = lessThanOrEqualTo;
export const empty = () => new EmptyCondition();
export const isEmpty = empty;
export const notExist = empty;
export const notEmpty = () => new NotEmptyCondition();
export const isNotEmpty = notEmpty;
export const exists = notEmpty;
export const before = <T>(params: T | T[]) => new BeforeCondition<T>(params);
export const onOrBefore = <T>(params: T | T[]) => new OnOrBeforeCondition<T>(params);
export const after = <T>(params: T | T[]) => new AfterCondition<T>(params);
export const onOrAfter = <T>(params: T | T[]) => new OnOrAfterCondition<T>(params);
export const pastWeek = () => new PastWeekCondition();
export const pastMonth = () => new PastMonthCondition();
export const pastYear = () => new PastYearCondition();
export const thisWeek = () => new ThisWeekCondition();
export const nextWeek = () => new NextWeekCondition();
export const nextMonth = () => new NextMonthCondition();
export const nextYear = () => new NextYearCondition();

import {
  TextFilter,
  TextFilterCondition,
  TextPropertyFilterType,
  NumberFilter,
  NumberFilterCondition,
  CheckboxFilter,
  CheckboxFilterCondition,
  SelectFilter,
  SelectFilterCondition,
  MultiSelectFilter,
  MultiSelectFilterCondition,
  StatusFilter,
  StatusFilterCondition,
  DateFilter,
  DateFilterCondition,
  PeopleFilter,
  PeopleFilterCondition,
  PeoplePropertyFilterType,
  FilesFilter,
  FilesFilterCondition,
  RelationFilter,
  RelationFilterCondition,
  RollUpFilter,
  RollUpFilterFilter,
  RollUpFilterAggregationType,
  FormulaFilter,
  FormulaFilterFilter,
  FormulaFilterAggregationType,
  CompoundFilter,
} from './filter';

export const textFilter = (
  property: string,
  conditions: TextFilterCondition | TextFilterCondition[],
  filterType: TextPropertyFilterType = 'rich_text'
) => new TextFilter(property, conditions, filterType);

export const numberFilter = (
  property: string,
  conditions: NumberFilterCondition | NumberFilterCondition[],
) => new NumberFilter(property, conditions);

export const checkboxFilter = (
  property: string,
  conditions: CheckboxFilterCondition | CheckboxFilterCondition[],
) => new CheckboxFilter(property, conditions);

export const selectFilter = (
  property: string,
  conditions: SelectFilterCondition | SelectFilterCondition[],
) => new SelectFilter(property, conditions);

export const multiSelectFilter = (
  property: string,
  conditions: MultiSelectFilterCondition | MultiSelectFilterCondition[],
) => new MultiSelectFilter(property, conditions);

export const statusFilter = (
  property: string,
  conditions: StatusFilterCondition | StatusFilterCondition[],
) => new StatusFilter(property, conditions);

export const dateFilter = (
  property: string,
  conditions: DateFilterCondition | DateFilterCondition[],
) => new DateFilter(property, conditions);

export const peopleFilter = (
  property: string,
  conditions: PeopleFilterCondition | PeopleFilterCondition[],
  filterType: PeoplePropertyFilterType,
) => new PeopleFilter(property, conditions, filterType);

export const filesFilter = (
  property: string,
  conditions: FilesFilterCondition | FilesFilterCondition[],
) => new FilesFilter(property, conditions);

export const relationFilter = (
  property: string,
  conditions: RelationFilterCondition | RelationFilterCondition[],
) => new RelationFilter(property, conditions);

export function rollupFilter(aggregation: 'any' | 'every' | 'none', childFilter: RollUpFilterFilter): RollUpFilter;
export function rollupFilter(aggregation: 'number', childFilter: NumberFilter): RollUpFilter;
export function rollupFilter(aggregation: 'date', childFilter: DateFilter): RollUpFilter;
export function rollupFilter(
  aggregation: RollUpFilterAggregationType,
  childFilter: RollUpFilterFilter,
) {
  return new RollUpFilter(aggregation, childFilter);
}

export function formulaFilter(aggregation: 'string', childFilter: TextFilter): FormulaFilter;
export function formulaFilter(aggregation: 'checkbox', childFilter: CheckboxFilter): FormulaFilter;
export function formulaFilter(aggregation: 'number', childFilter: NumberFilter): FormulaFilter;
export function formulaFilter(aggregation: 'date', childFilter: DateFilter): FormulaFilter;
export function formulaFilter(
  aggregation: FormulaFilterAggregationType,
  childFilter: FormulaFilterFilter,
) {
  return new FormulaFilter(aggregation, childFilter);
}

export const compoundFilter = () => {
  return new CompoundFilter();
}

import {
  FilterQuery,
  FilterQueryFilter
} from './query';

export const filterQuery = (
  childFilters: FilterQueryFilter | FilterQueryFilter[]
) => {
  return new FilterQuery(childFilters);
}

import {
  Sort,
  SortDirection,
  SortProperty,
  SortTime,
} from './sort';

export function sort(property: 'created_time' | 'last_edited_time', direction?: SortDirection): Sort<SortTime>;
export function sort(property: string, direction?: SortDirection): Sort<SortProperty>;
export function sort(property: string, direction?: SortDirection) {
  return new Sort(property, direction);
}