import {
  EqualCondition,
  NotEqualCondition,
  EmptyCondition,
  NotEmptyCondition,
  GreaterThanCondition,
  GreaterThanOrEqualToCondition,
  LessThanCondition,
  LessThanOrEqualToCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type NumberFilterCondition =
  | EqualCondition<number>
  | NotEqualCondition<number>
  | GreaterThanCondition<number>
  | GreaterThanOrEqualToCondition<number>
  | LessThanCondition<number>
  | LessThanOrEqualToCondition<number>
  | EmptyCondition
  | NotEmptyCondition;

export type NumberPropertyFilterObject<T> = PropertyFilterObject & {
  number: { [k: string]: T }
};

export type NumberFilterObject = NumberPropertyFilterObject<number | number[]> | NumberPropertyFilterObject<boolean>;

export class NumberFilter extends TermFilter {
  constructor(
    property: string,
    conditions: NumberFilterCondition | NumberFilterCondition[],
  ) {
    super(property, conditions, 'number');
  }
  toJson(): NumberFilterObject[][] {
    return super.toJson();
  }
}