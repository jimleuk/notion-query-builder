import {
  ContainCondition,
  NotContainCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type RelationFilterCondition =
  | ContainCondition<string>
  | NotContainCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type RelationPropertyFilterObject<T> = PropertyFilterObject & {
  relation: { [k: string]: T }
};

export type RelationFilterObject = RelationPropertyFilterObject<string | string[]> | RelationPropertyFilterObject<boolean>;

export class RelationFilter extends TermFilter {
  constructor(
    property: string,
    conditions: RelationFilterCondition | RelationFilterCondition[],
  ) {
    super(property, conditions, 'relation');
  }
  toJson(): RelationFilterObject[][] {
    return super.toJson();
  }
}