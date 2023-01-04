import { Condition } from './condition';

export class NotEqualCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('does_not_equal', params);
  }
}
