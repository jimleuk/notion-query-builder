import { Condition } from './condition';

export class PastMonthCondition extends Condition<{}> {
  constructor() {
    super('past_month', {});
  }
}