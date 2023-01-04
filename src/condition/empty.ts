import { Condition } from './condition';

export class EmptyCondition extends Condition<boolean> {
  constructor() {
    super('empty', true);
  }
}