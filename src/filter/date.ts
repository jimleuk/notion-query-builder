import {
  EqualCondition,
  EmptyCondition,
  NotEmptyCondition,
  BeforeCondition,
  OnOrBeforeCondition,
  AfterCondition,
  OnOrAfterCondition,
  PastWeekCondition,
  PastMonthCondition,
  PastYearCondition,
  ThisWeekCondition,
  NextWeekCondition,
  NextMonthCondition,
  NextYearCondition,
} from '../condition';
import { TermFilter } from './filter';
import { TimestampFilterObject } from './types';

export type DateFilterCondition =
  | EqualCondition<string | Date>
  | BeforeCondition<string | Date>
  | OnOrBeforeCondition<string | Date>
  | AfterCondition<string | Date>
  | OnOrAfterCondition<string | Date>
  | PastWeekCondition
  | PastMonthCondition
  | PastYearCondition
  | ThisWeekCondition
  | NextWeekCondition
  | NextMonthCondition
  | NextYearCondition
  | EmptyCondition
  | NotEmptyCondition;

export type DateTimestampFilterObject<T> = TimestampFilterObject & {
  date?: { [k: string]: T }
  created_time?: { [k: string]: T }
  last_edited_time?: { [k: string]: T }
};

export type DateTimestampFilterType = 'date' | 'created_time' | 'last_edited_time';

export type DateFilterObject = DateTimestampFilterObject<string | string[] | Date | Date[]> | DateTimestampFilterObject<boolean> | DateTimestampFilterObject<Record<string, unknown>>;

export class DateFilter extends TermFilter {
  constructor(
    property: string,
    conditions: DateFilterCondition | DateFilterCondition[],
    filterType: DateTimestampFilterType = 'date'
  ) {
    super(property, conditions, filterType, 'timestamp');
  }
  transform(conditionObject: { [k: string]: string | Date | boolean }) {
    return Object.keys(conditionObject).reduce((acc, key) => ({
      ...acc,
      [key]: conditionObject[key] instanceof Date ? (conditionObject[key] as Date).toISOString() : conditionObject[key]
    }), {});
  }
  toJson(): DateFilterObject[][] {
    return super.toJson();
  }
}