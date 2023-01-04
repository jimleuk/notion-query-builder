import {
  EqualCondition,
  NotEqualCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type StatusFilterCondition =
  | EqualCondition<string>
  | NotEqualCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type StatusPropertyFilterObject<T> = PropertyFilterObject & {
  status: { [k: string]: T }
};

export type StatusFilterObject = StatusPropertyFilterObject<string | string[]> | StatusPropertyFilterObject<boolean>;

export class StatusFilter extends TermFilter {
  constructor(
    property: string,
    conditions: StatusFilterCondition | StatusFilterCondition[],
  ) {
    super(property, conditions, 'status');
  }
  toJson(): StatusFilterObject[][] {
    return super.toJson();
  }
}