import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the past year.
 * 
 * @example
 * const condition = nob.pastYear()
 * 
 * @extends Condition
 */
export class PastYearCondition extends Condition<{}> {
  constructor() {
    super('past_year', {});
  }
}