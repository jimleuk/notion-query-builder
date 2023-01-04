import { Condition } from './condition';

export class AfterCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('after', params);
  }
}