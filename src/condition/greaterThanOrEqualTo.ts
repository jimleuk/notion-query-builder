import { Condition } from './condition';

/**
 * Only return pages where the page property value is greater than or equal to the provided value.
 * 
 * @example
 * const condition = nob.greaterThanOrEqualTo(12)
 * 
 * // aliases
 * const condition = nob.gte(12)
 * const condition = nob.moreThanOrEqualTo(12)
 * 
 * @param {number|number[]} params the condition value
 * 
 * @extends Condition
 */
export class GreaterThanOrEqualToCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('greater_than_or_equal_to', params);
  }
}