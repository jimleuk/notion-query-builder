import { Condition } from './condition';

/**
 * Only return pages where the page property value does not contain the provided value.
 * 
 * @example
 * const condition = nob.notContain('Bridge')
 * const condition = nob.notContain(['Bridge', 'Moat'])
 * 
 * // aliases
 * const condition = nob.notContains('Bridge')
 * const condition = nob.doesNotContain('Bridge')
 * const condition = nob.hasNot('Bridge')
 * const condition = nob.exclude('Bridge')
 * const condition = nob.excludes('Bridge')
 * 
 * @param {(string|number)|(string|number)[]} params the condition value
 * 
 * @extends Condition
 */
export class NotContainCondition<T> extends Condition<T> {
  constructor(params: T | T[]) {
    super('does_not_contain', params);
  }
}