import { TermFilter } from './filter';
import { TextFilter, TextFilterObject } from './text';
import { NumberFilter, NumberFilterObject } from './number';
import { DateFilter, DateFilterObject } from './date';
import { PropertyFilterObject, TimestampFilterObject } from './types';

/**
 * Possible aggregation types for RollUpFilter
 */
export type RollUpFilterAggregationType = 'any' | 'every' | 'none' | 'number' | 'date';

/**
 * Possible conditions to be used with RollUpFilter
 */
export type RollUpFilterFilter =
  | TextFilter
  | NumberFilter
  | DateFilter;

export type RollUpCompositeFilterObject<T> = PropertyFilterObject & TimestampFilterObject & {
  property?: string;
  timestamp?: string;
  rollup: {
    any?: T;
    every?: T;
    none?: T;
    number?: T;
    date?: T;
  }
};

export type RollUpFilterFilterObject =
  | Omit<TextFilterObject, 'property'>
  | Omit<NumberFilterObject, 'property'>
  | Omit<DateFilterObject, 'property'>
  | { [k: string]: string | number | Date };

/**
 * JSON representation of the RollUpFilter
 */
export type RollUpFilterObject = Omit<RollUpCompositeFilterObject<RollUpFilterFilterObject>, 'property' | 'timestamp'> & {
  property?: string;
  timestamp?: string;
};

/**
 * A rollup filter condition can be applied to database properties of type "rollup".
 * Rollups which evaluate to arrays accept a filter with an any, every, or none condition;
 * rollups which evaluate to numbers accept a filter with a number condition; and rollups
 * which evaluate to dates accept a filter with a date condition.
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#rollup-filter-condition)
 *
 * @example
 * const filter = nob.rollUpFilter('any', nob.numberQuery('age', nob.greaterThan(12)))
 * 
 * @param {RollUpFilterAggregationType} aggregation the aggregation type to use
 * @param {RollUpFilterFilter} childFilter the child filter for the rollup
 * 
 * @export
 * @class RollUpFilter
 * @extends {TermFilter}
 */
export class RollUpFilter extends TermFilter {
  constructor(
    private aggregation: RollUpFilterAggregationType,
    childFilter: RollUpFilterFilter,
  ) {
    super(childFilter.getProperty(), childFilter, 'rollup', childFilter.getTermFilterType());
  }
  transform(childFilterObjects: RollUpFilterObject[]) {
    const childFilterObject = Array.isArray(childFilterObjects) && childFilterObjects.length === 1
      ? childFilterObjects[0]
      : childFilterObjects;
    const childFilterType = this.conditions.getFilterType();
    const childfilterConditionValue = childFilterObject[childFilterType];
    const childfilterCondition = { [childFilterType]: childfilterConditionValue };

    return {
      [this.aggregation]: (
          this.aggregation === 'any'
          || this.aggregation === 'every'
          || this.aggregation === 'none'
        )
          ? childfilterCondition
          : childfilterConditionValue
    }
  }
  /**
   * @returns {RollUpFilterObject[][]}
   */
  toJson(): RollUpFilterObject[][] {
    return super.toJson();
  }
}