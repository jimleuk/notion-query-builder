import { Condition } from './condition';

export class NextYearCondition extends Condition<{}> {
  constructor() {
    super('next_year', {});
  }
}