import { Condition } from './condition';

/**
 * Only return pages where the page property value ends with the provided value.
 * 
 * @example
 * const condition = nob.endsWith('Bridge')
 * const condition = nob.endsWith(['Bridge', 'Moat'])
 * 
 * @param {string|string[]} params the condition value
 * 
 * @extends Condition
 */
export class EndsWithCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('ends_with', params);
  }
}