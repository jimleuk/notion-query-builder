import { Condition } from './condition';

export class BeforeCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('before', params);
  }
}