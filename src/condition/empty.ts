import { Condition } from './condition';

/**
 * Only return pages where the page property value is empty.
 * 
 * @example
 * const condition = nob.empty()
 * 
 * // aliases
 * const condition = nob.isEmpty()
 * const condition = nob.notExist()
 * 
 * @extends Condition
 */
export class EmptyCondition extends Condition<boolean> {
  constructor() {
    super('empty', true);
  }
}