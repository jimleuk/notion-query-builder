import {
  EqualCondition,
  NotEqualCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type CheckboxFilterCondition =
  | EqualCondition<boolean>
  | NotEqualCondition<boolean>;

export type CheckboxPropertyFilterObject<T> = PropertyFilterObject & {
  checkbox: { [k: string]: T }
};

export type CheckboxFilterObject = CheckboxPropertyFilterObject<boolean>;

export class CheckboxFilter extends TermFilter {
  constructor(
    property: string,
    conditions: CheckboxFilterCondition | CheckboxFilterCondition[],
  ) {
    super(property, conditions, 'checkbox');
  }
  toJson(): CheckboxFilterObject[][] {
    return super.toJson();
  }
}