import { Condition } from './condition';

export class NextMonthCondition extends Condition<{}> {
  constructor() {
    super('next_month', {});
  }
}