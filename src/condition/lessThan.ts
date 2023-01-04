import { Condition } from './condition';

export class LessThanCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('less_than', params);
  }
}