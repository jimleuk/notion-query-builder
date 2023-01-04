import {
  EqualCondition,
  NotEqualCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type SelectFilterCondition =
  | EqualCondition<string>
  | NotEqualCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type SelectPropertyFilterObject<T> = PropertyFilterObject & {
  select: { [k: string]: T }
};

export type SelectFilterObject = SelectPropertyFilterObject<string | string[]> | SelectPropertyFilterObject<boolean>;

export class SelectFilter extends TermFilter {
  constructor(
    property: string,
    conditions: SelectFilterCondition | SelectFilterCondition[],
  ) {
    super(property, conditions, 'select');
  }
  toJson(): SelectFilterObject[][] {
    return super.toJson();
  }
}
