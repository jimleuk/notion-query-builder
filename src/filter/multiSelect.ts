import {
  ContainCondition,
  NotContainCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type MultiSelectFilterCondition =
  | ContainCondition<string>
  | NotContainCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type MultiSelectPropertyFilterObject<T> = PropertyFilterObject & {
  multi_select: { [k: string]: T }
};

export type MultiSelectFilterObject = MultiSelectPropertyFilterObject<string | string[]> | MultiSelectPropertyFilterObject<boolean>;

export class MultiSelectFilter extends TermFilter {
  constructor(
    property: string,
    conditions: MultiSelectFilterCondition | MultiSelectFilterCondition[],
  ) {
    super(property, conditions, 'multi_select');
  }
  toJson(): MultiSelectFilterObject[][] {
    return super.toJson();
  }
}