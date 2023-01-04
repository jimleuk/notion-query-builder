import { Condition } from './condition';

/**
 * Only return pages where the page property value contains the provided value.
 * 
 * @example
 * const condition = nob.contain('Bridge')
 * const condition = nob.contain(['Bridge', 'Moat'])
 * 
 * // aliases
 * const condition = nob.contains('Bridge')
 * const condition = nob.has('Bridge')
 * const condition = nob.include('Bridge')
 * const condition = nob.includes('Bridge')
 * 
 * @param {(string|number)|(string|number)[]} params the condition value
 * 
 * @extends Condition
 */
export class ContainCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('contains', params);
  }
}