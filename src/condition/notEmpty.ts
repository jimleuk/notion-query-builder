import { Condition } from './condition';

/**
 * Only return pages where the page property value is present.
 * 
 * @example
 * const condition = nob.notEmpty()
 * 
 * // aliases
 * const condition = nob.isNotEmpty()
 * const condition = nob.exists()
 * 
 * @extends Condition
 */
export class NotEmptyCondition extends Condition<boolean> {
  constructor() {
    super('is_not_empty', true);
  }
}