import { Condition } from './condition';

export class GreaterThanOrEqualToCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('greater_than_or_equal_to', params);
  }
}