import {
  EqualCondition,
  NotEqualCondition,
  ContainCondition,
  NotContainCondition,
  StartsWithCondition,
  EndsWithCondition,
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type TextFilterCondition =
  | EqualCondition<string>
  | NotEqualCondition<string>
  | ContainCondition<string>
  | NotContainCondition<string>
  | StartsWithCondition<string>
  | EndsWithCondition<string>
  | EmptyCondition
  | NotEmptyCondition;

export type TextPropertyFilterType = 'title' | 'rich_text' | 'url' | 'email' | 'phone_number';

export type TextPropertyFilterObject<T> = PropertyFilterObject & {
  title?: { [k: string]: T };
  rich_text?: { [k: string]: T };
  url?: { [k: string]: T };
  email?: { [k: string]: T };
  phone_number?: { [k: string]: T };
};

export type TextFilterObject = TextPropertyFilterObject<string | string[]> | TextPropertyFilterObject<boolean>;

export class TextFilter extends TermFilter {
  constructor(
    property: string,
    conditions: TextFilterCondition | TextFilterCondition[],
    filterType: TextPropertyFilterType = 'rich_text'
  ) {
    super(property, conditions, filterType);
  }
  toJson(): TextFilterObject[][] {
    return super.toJson();
  }
}