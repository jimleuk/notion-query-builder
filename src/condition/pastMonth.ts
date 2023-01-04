import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the past month.
 * 
 * @example
 * const condition = nob.pastMonth()
 * 
 * @extends Condition
 */
export class PastMonthCondition extends Condition<{}> {
  constructor() {
    super('past_month', {});
  }
}