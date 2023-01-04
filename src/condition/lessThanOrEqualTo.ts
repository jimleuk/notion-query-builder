import { Condition } from './condition';

/**
 * Only return pages where the page property value is less than or equal to the provided value.
 * 
 * @example
 * const condition = nob.lessThanOrEqualTo(12)
 * 
 * // aliases
 * const condition = nob.lte(12)
 * 
 * @param {number|number[]} params the condition value
 * 
 * @extends Condition
 */
export class LessThanOrEqualToCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('less_than_or_equal_to', params);
  }
}