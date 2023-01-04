import { Condition } from './condition';

export class NotContainCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('does_not_contain', params);
  }
}