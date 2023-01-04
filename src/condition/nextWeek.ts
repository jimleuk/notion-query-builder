import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the next week.
 * 
 * @example
 * const condition = nob.nextWeek()
 * 
 * @extends Condition
 */
export class NextWeekCondition extends Condition<{}> {
  constructor() {
    super('next_week', {});
  }
}