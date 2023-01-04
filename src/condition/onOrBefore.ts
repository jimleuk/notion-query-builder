import { Condition } from './condition';

export class OnOrBeforeCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('on_or_before', params);
  }
}