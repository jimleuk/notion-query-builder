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

/**
 * Possible filters to use with FilterQuery
 */
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

/**
 * JSON representation of FilterQuery
 */
export type FilterQueryFilterObject =
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

/**
 * A filter is a single condition used to specify and limit the entries returned
 * from a database query. Database queries can be filtered by page property values.
 * The API supports filtering by the following property types: rich_text, phone_number,
 * number, checkbox, select, multi-select, date, people, files, relation, status, and
 * formula. You may also filter a database by created_time or last_edited_time, even
 * if these aren't present as properties on the database.
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter)
 * 
 * @example
 * const query = nob.filterQuery(nob.textQuery('name', nob.equal('Jim')))
 * 
 * // when given array, filterQuery() autowraps child filters in a new CompoundFilter with an "and" list
 * const query = nob.filterQuery([
 *  nob.textQuery('name', nob.equal('Jack')),
 *  nob.textQuery('name', nob.equal('Jill'))
 * ])
 * 
 * const query = nob.filterQuery(
 *  nob.compoundFilter()
 *  .or(nob.textQuery('name', nob.equal('Jack')))
 *  .or(nob.textQuery('name', nob.equal('Jill')))
 * )
 * 
 * @param {FilterQueryFilter|FilterQueryFilter[]} childFilters
 * 
 * @export
 * @class FilterQuery
 */
export class FilterQuery {
  private childFilters: FilterQueryFilter | FilterQueryFilter[];
  constructor(
    childFilters: FilterQueryFilter | FilterQueryFilter[]
  ) {
    this.childFilters = childFilters;
  }

  getFilters(): FilterQueryFilterObject {
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
  /**
   * @returns {FilterQueryFilterObject}
   */
  toJson() {
    return this.getFilters();
  }
}
