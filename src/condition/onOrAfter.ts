import { Condition } from './condition';

export class OnOrAfterCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('on_or_after', params);
  }
}