import { Condition } from './condition';

export class NextWeekCondition extends Condition<{}> {
  constructor() {
    super('next_week', {});
  }
}