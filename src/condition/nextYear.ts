import { Condition } from './condition';

/**
 * Only return pages where the page property value is within the next year.
 * 
 * @example
 * const condition = nob.nextYear()
 * 
 * @extends Condition
 */
export class NextYearCondition extends Condition<{}> {
  constructor() {
    super('next_year', {});
  }
}