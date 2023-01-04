import { Condition } from './condition';

export class ContainCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('contains', params);
  }
}