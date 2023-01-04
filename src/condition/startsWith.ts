import { Condition } from './condition';

/**
 * Only return pages where the page property value starts with the provided value.
 * 
 * @example
 * const condition = nob.startsWith('Bridge')
 * const condition = nob.startsWith(['Bridge', 'Moat'])
 * 
 * @param {string|string[]} params the condition value
 * 
 * @extends Condition
 */
export class StartsWithCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('starts_with', params);
  }
}