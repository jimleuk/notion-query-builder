import { Condition } from './condition';

export class NotEmptyCondition extends Condition<boolean> {
  constructor() {
    super('is_not_empty', true);
  }
}