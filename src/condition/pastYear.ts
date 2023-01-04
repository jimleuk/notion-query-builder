import { Condition } from './condition';

export class PastYearCondition extends Condition<{}> {
  constructor() {
    super('past_year', {});
  }
}