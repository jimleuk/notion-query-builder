export type SortDirection = 'ascending' | 'descending';

/**
 * 
 */
export type SortBase = {
  direction: SortDirection;
}

/**
 * 
 */
export type SortProperty = SortBase & {
  property: string;
}

/**
 * 
 */
export type SortTimeType = 'created_time' | 'last_edited_time';

/**
 * 
 */
export type SortTime = SortBase & {
  timestamp: SortTimeType;
}