import { Condition  } from './condition';

/**
 * Only return pages where the page property value is greater than the provided value.
 * 
 * @example
 * const condition = nob.greaterThan(12)
 * 
 * // aliases
 * const condition = nob.gt(12)
 * const condition = nob.moreThan(12)
 * 
 * @param {number|number[]} params the condition value
 * 
 * @extends Condition
 */
export class GreaterThanCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('greater_than', params);
  }
}