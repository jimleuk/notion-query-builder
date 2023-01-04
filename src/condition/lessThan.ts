import { Condition } from './condition';

/**
 * Only return pages where the page property value is less than the provided value.
 * 
 * @example
 * const condition = nob.lessThan(12)
 * 
 * // aliases
 * const condition = nob.lt(12)
 * 
 * @param {number|number[]} params the condition value
 * 
 * @extends Condition
 */
export class LessThanCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('less_than', params);
  }
}