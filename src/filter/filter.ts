import { TermFilterType } from './types';

export class Filter {
  constructor(
    protected filterType: string,
  ) {}

  public getFilterType() {
    return this.filterType;
  }
}

/**
 * TermFilter is a base class which represents all filters that take conditions as arguments
 * 
 * @param {string} property the database field which this filter will be applied
 * @param {Condition|Condition[]} conditions one or more conditions for this filter
 * @param {string} filterType certain filters can have variations eg TextFilter can be either title, rich_text etc
 * @param {TermFilterType} termFilterType determines whether this is a propertyFilter or a timestampFilter
 * 
 * @class TermFilter
 * @extends Filter
 */
export class TermFilter extends Filter {
  protected property: string;
  protected conditions;
  protected termFilterType: TermFilterType;

  constructor(
    property: string,
    conditions,
    filterType: string,
    termFilterType: TermFilterType = 'property'
  ) {
    super(filterType);
    this.property = property;
    this.conditions = conditions;
    this.termFilterType = termFilterType;
  }

  /**
   * A hook to optionally apply any tranforms to the condition value(s) when
   * returning the toJson() object
   * 
   * @example
   * // For DateFilter, we convert any Date objects to ISO Strings
   * 
   * transform(conditionObject: { [k: string]: string | Date | boolean }) {
   *  return Object.keys(conditionObject).reduce((acc, key) => ({
   *    ...acc,
   *    [key]: conditionObject[key] instanceof Date ? (conditionObject[key] as Date).toISOString() : conditionObject[key]
   *  }), {});
   * }
   * 
   * @param {ConditionValueObject} value 
   * @returns ConditionValueObject
   */
  public transform(value) {
    return value;
  }

  /**
   * the filter's "property" value
   * @returns {string}
   */
  public getProperty() {
    return this.property;
  }

  /**
   * the filter's "filterType" value
   * @returns {string}
   */
  public getFilterType() {
    return this.filterType;
  }

  /**
   * the filter's "termFilterType" value
   * @returns {TermFilterType}
   */
  public getTermFilterType() {
    return this.termFilterType;
  }

  /**
   * Returns the JSON respresentation of the filter to be used in API requests.
   * 
   * @returns {json} [k: 'property' | 'timestamp'] : string; [filterType: string]: ConditionValue  }[][]
   */
  public toJson() {
    const conds = Array.isArray(this.conditions) ? this.conditions : [this.conditions];
    return conds.map(cond => (
      cond.toJson().map((value) => ({
        [this.termFilterType]: this.property,
        [this.filterType]: this.transform(value)
      })
    )));
  }
}