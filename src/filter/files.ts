import {
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

/**
 * Possible conditions to be used with FilesFilter
 */
export type FilesFilterCondition =
  | EmptyCondition
  | NotEmptyCondition;

export type FilesPropertyFilterObject<T> = PropertyFilterObject & {
  files: { [k: string]: T }
};

/**
 * JSON representation of the FilesFilter
 */
export type FilesFilterObject = FilesPropertyFilterObject<boolean>;

/**
 * A files filter condition can be applied to database properties of type "files".
 * 
 * [Official Reference](https://developers.notion.com/reference/post-database-query-filter#files-filter-condition)
 * 
 * @example
 * const filter = nob.filesFilter('fileType', nob.equal('pdf'))
 * 
 * @param {string} property the database property
 * @param {FilesFilterCondition|FilesFilterCondition[]} conditions
 * 
 * @export
 * @class FilesFilter
 * @extends {TermFilter}
 */
export class FilesFilter extends TermFilter {
  constructor(
    property: string,
    conditions: FilesFilterCondition | FilesFilterCondition[],
  ) {
    super(property, conditions, 'files');
  }
  /**
   * @returns {FilesFilterObject[][]}
   */
  toJson(): FilesFilterObject[][] {
    return super.toJson();
  }
}