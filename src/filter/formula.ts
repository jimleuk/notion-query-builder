import { TermFilter } from './filter';
import { TextFilter, TextFilterObject } from './text';
import { NumberFilter, NumberFilterObject } from './number';
import { DateFilter, DateFilterObject } from './date';
import { CheckboxFilter, CheckboxFilterObject } from './checkbox';
import { PropertyFilterObject, TimestampFilterObject } from './types';

/**
 * Possible aggregation types for FormulaFilter
 */
export type FormulaFilterAggregationType = 'string' | 'checkbox' | 'number' | 'date';

/**
 * Possible conditions to be used with FormulaFilter
 */
export type FormulaFilterFilter =
  | TextFilter
  | CheckboxFilter
  | NumberFilter
  | DateFilter;

export type FormulaCompositeFilterObject<T> = PropertyFilterObject & TimestampFilterObject & {
  property?: string;
  timestamp?: string;
  formula: {
    string?: T;
    checkbox?: T;
    number?: T;
    date?: T;
  }
};

export type FormulaFilterFilterObject =
  | Omit<TextFilterObject, 'property'>
  | Omit<CheckboxFilterObject, 'property'>
  | Omit<NumberFilterObject, 'property'>
  | Omit<DateFilterObject, 'timestamp'>
  | { [k: string]: string | number | Date | boolean };

/**
 * JSON representation of the FormulaFilter
 */
export type FormulaFilterObject = Omit<FormulaCompositeFilterObject<FormulaFilterFilterObject>, 'property' | 'timestamp'> & {
  property?: string;
  timestamp?: string;
};
/**
 * A formula filter condition can be applied to database properties of type "formula".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#formula-filter-condition)
 *
 * @example
 * const filter = nob.formulaFilter('number', nob.numberQuery('age', nob.greaterThan(12)))
 * 
 * @param {FormulaFilterAggregationType} aggregation the aggregation type to use
 * @param {FormulaFilterFilter} childFilter the child filter for the formula
 * 
 * @export
 * @class FormulaFilter
 * @extends {TermFilter}
 */
export class FormulaFilter extends TermFilter {
  private aggregation: FormulaFilterAggregationType;

  constructor(
    aggregation: FormulaFilterAggregationType,
    childFilter: FormulaFilterFilter,
  ) {
    super(childFilter.getProperty(), childFilter, 'formula', childFilter.getTermFilterType());
    this.aggregation = aggregation;
  }
  transform(childFilterObjects: FormulaFilterObject[]) {
    const childFilterType = this.conditions.getFilterType();
    const childFilterObject = Array.isArray(childFilterObjects) && childFilterObjects.length === 1
      ? childFilterObjects[0]
      : childFilterObjects;
    return {
      [this.aggregation]: childFilterObject[childFilterType]
    }
  }
  /**
   * @returns {FormulaFilterObject[][]}
   */
  toJson(): FormulaFilterObject[][] {
    return super.toJson();
  }
}