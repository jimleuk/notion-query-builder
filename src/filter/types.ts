export type PropertyFilterObject = {
  property: string;
};

export type TimestampFilterObject = {
  timestamp: string;
};

/**
 * TermFilter types
 * 
 * @example
 * // when "property"
 * {
 *   property: 'field',
 *   ...
 * }
 * 
 * // when "timestamp"
 * {
 *   timestamp: 'field',
 *   ...
 * }
 */
export type TermFilterType = 'property' | 'timestamp';
