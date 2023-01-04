import { Condition } from './condition';

export class EqualCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('equals', params);
  }
}