import { Condition } from './condition';

export class EndsWithCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('ends_with', params);
  }
}