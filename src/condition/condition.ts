/**
 * The base class for all conditions.
 * 
 * @param property the condition name
 * @param params the condition value
 */
export class Condition<T> {
  private property: string;
  private params: T | T[];

  constructor(
    property: string,
    params: T | T[],
  ) {
    this.property = property;
    this.params = params;
  }

  /**
   * Returns the JSON respresentation of the condition to be used in API requests.
   * 
   * @returns {json} [{ [k: string ] : value }]
   */
  toJson() {
    const values = Array.isArray(this.params) ? this.params : [this.params];
    return values.map(value => ({ [this.property]: value }));
  }
}