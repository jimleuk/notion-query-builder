import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the past week.
 * 
 * @example
 * const condition = nob.pastWeek()
 * 
 * @extends Condition
 */
export class PastWeekCondition extends Condition<{}> {
  constructor() {
    super('past_week', {});
  }
}