import {
  ContainCondition,
  NotContainCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type PeopleFilterCondition =
  | ContainCondition<string>
  | NotContainCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type PeoplePropertyFilterObject<T> = PropertyFilterObject & {
  people?: { [k: string]: T }
  created_by?: { [k: string]: T }
  last_edited_by?: { [k: string]: T }
};

export type PeoplePropertyFilterType = 'people' | 'created_by' | 'last_edited_by';

export type PeopleFilterObject = PeoplePropertyFilterObject<string | string[]> | PeoplePropertyFilterObject<boolean>;

export class PeopleFilter extends TermFilter {
  constructor(
    property: string,
    conditions: PeopleFilterCondition | PeopleFilterCondition[],
    filterType: PeoplePropertyFilterType = 'people'
  ) {
    super(property, conditions, filterType);
  }
  toJson(): PeopleFilterObject[][] {
    return super.toJson();
  }
}