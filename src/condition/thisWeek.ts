import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the current week.
 * The current week starts on the most recent Sunday and ends on the upcoming Saturday.
 * 
 * @example
 * const condition = nob.thisWeek()
 * 
 * @extends Condition
 */
export class ThisWeekCondition extends Condition<{}> {
  constructor() {
    super('this_week', {});
  }
}