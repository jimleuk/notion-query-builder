import { Condition } from './condition';

/**
 * Only return pages where the page property value matches the provided value exactly.
 * 
 * @example
 * const condition = nob.equal('Bridge')
 * const condition = nob.equal(['Bridge', 'Moat'])
 * const condition = nob.equal(12)
 * const condition = nob.equal(false)
 * 
 * // aliases
 * export condition = nob.equals('Bridge')
 * export condition = nob.eq('Bridge')
 * export condition = nob.is('Bridge')
 * export condition = nob.be('Bridge')
 * 
 * @param {string|number|boolean|(string|number|boolean)[]} params the condition value
 * 
 * @extends Condition
 */
export class EqualCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('equals', params);
  }
}