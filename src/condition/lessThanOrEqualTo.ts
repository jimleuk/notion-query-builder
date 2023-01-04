import { Condition } from './condition';

export class LessThanOrEqualToCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('less_than_or_equal_to', params);
  }
}