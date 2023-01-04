import { Condition  } from './condition';

export class GreaterThanCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('greater_than', params);
  }
}