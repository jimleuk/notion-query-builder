import { Condition } from './condition';

export class ThisWeekCondition extends Condition<{}> {
  constructor() {
    super('this_week', {});
  }
}