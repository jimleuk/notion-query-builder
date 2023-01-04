import { Condition } from './condition';

export class PastWeekCondition extends Condition<{}> {
  constructor() {
    super('past_week', {});
  }
}