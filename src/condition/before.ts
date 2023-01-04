import { Condition } from './condition';

/**
 * Only return pages where the page property value is before the provided date.
 * If a date with a time is provided, the comparison is done with millisecond precision.
 * Note that if no timezone is provided, the default is UTC.
 * 
 * @example
 * const condition = nob.before('2023-01-01')
 * const condition = nob.before(new Date(2023, 0, 1))
 * 
 * @param {(string|Date)|(string|Date)[]} params the condition value
 * 
 * @extends Condition
 */
export class BeforeCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('before', params);
  }
}