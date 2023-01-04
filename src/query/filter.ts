import {
  TextFilter,
  TextFilterObject,
  NumberFilter,
  NumberFilterObject,
  CheckboxFilter,
  CheckboxFilterObject,
  SelectFilter,
  SelectFilterObject,
  MultiSelectFilter,
  MultiSelectFilterObject,
  StatusFilter,
  StatusFilterObject,
  DateFilter,
  DateFilterObject,
  PeopleFilter,
  PeopleFilterObject,
  FilesFilter,
  FilesFilterObject,
  RelationFilter,
  RelationFilterObject,
  RollUpFilter,
  RollUpFilterObject,
  FormulaFilter,
  FormulaFilterObject,
  CompoundFilter,
  CompoundFilterObject,
} from '../filter';

export type FilterQueryFilter =
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
  | FormulaFilter
  | CompoundFilter;

export type FilterFilterObject =
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
  | FormulaFilterObject
  | CompoundFilterObject;

export class FilterQuery {
  constructor(
    private childFilters: FilterQueryFilter | FilterQueryFilter[]
  ) {}

  getFilters() {
    if (!Array.isArray(this.childFilters)) {
      const childFilter = this.childFilters;
      return (childFilter instanceof CompoundFilter)
        ? childFilter.toJson()
        : childFilter.toJson().flatMap(filterObject => filterObject).reduce((acc, filterObject) => ({
          ...acc,
          ...filterObject,
        }), {});
    }
    const forceCompoundFilter = new CompoundFilter();
    this.childFilters.forEach(childFilter => forceCompoundFilter.and(childFilter));
    return forceCompoundFilter.toJson();
  }
  toJson() {
    return this.getFilters();
  }
}
