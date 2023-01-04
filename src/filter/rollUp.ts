import { TermFilter } from './filter';
import { TextFilter, TextFilterObject } from './text';
import { NumberFilter, NumberFilterObject } from './number';
import { DateFilter, DateFilterObject } from './date';
import { PropertyFilterObject, TimestampFilterObject } from './types';

export type RollUpFilterAggregationType = 'any' | 'every' | 'none' | 'number' | 'date';

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

export type RollUpFilterObject = Omit<RollUpCompositeFilterObject<RollUpFilterFilterObject>, 'property' | 'timestamp'> & {
  property?: string;
  timestamp?: string;
};

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
  toJson(): RollUpFilterObject[][] {
    return super.toJson();
  }
}