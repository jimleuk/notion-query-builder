import { Condition } from './condition';

/**
 * Only return pages where the page property value does not match the provided value exactly.
 * 
 * @example
 * const condition = nob.notEqual('Bridge')
 * const condition = nob.notEqual(['Bridge', 'Moat'])
 * const condition = nob.notEqual(12)
 * const condition = nob.notEqual(false)
 * 
 * // aliases
 * const condition = nob.notEquals('Bridge')
 * const condition = nob.neq('Bridge')
 * const condition = nob.isnt('Bridge')
 * const condition = nob.isNot('Bridge')
 * 
 * @param {string|number|boolean|(string|number|boolean)[]} params the condition value
 * 
 * @extends Condition
 */
export class NotEqualCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('does_not_equal', params);
  }
}
