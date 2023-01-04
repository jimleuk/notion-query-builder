import { TermFilter } from './filter';
import { TextFilter, TextFilterObject } from './text';
import { NumberFilter, NumberFilterObject } from './number';
import { DateFilter, DateFilterObject } from './date';
import { CheckboxFilter, CheckboxFilterObject } from './checkbox';
import { PropertyFilterObject, TimestampFilterObject } from './types';

export type FormulaFilterAggregationType = 'string' | 'checkbox' | 'number' | 'date';

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

export type FormulaFilterObject = Omit<FormulaCompositeFilterObject<FormulaFilterFilterObject>, 'property' | 'timestamp'> & {
  property?: string;
  timestamp?: string;
};

export class FormulaFilter extends TermFilter {
  constructor(
    private aggregation: FormulaFilterAggregationType,
    childFilter: FormulaFilterFilter,
  ) {
    super(childFilter.getProperty(), childFilter, 'formula', childFilter.getTermFilterType());
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
  toJson(): FormulaFilterObject[][] {
    return super.toJson();
  }
}