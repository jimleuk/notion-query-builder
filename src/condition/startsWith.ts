import { Condition } from './condition';

export class StartsWithCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('starts_with', params);
  }
}