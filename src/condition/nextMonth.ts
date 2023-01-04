import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the next month.
 * 
 * @example
 * const condition = nob.nextMonth()
 * 
 * @extends Condition
 */
export class NextMonthCondition extends Condition<{}> {
  constructor() {
    super('next_month', {});
  }
}