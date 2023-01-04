import {
  EmptyCondition,
  NotEmptyCondition,
} from '../condition';
import { TermFilter } from './filter';
import { PropertyFilterObject } from './types';

export type FilesFilterCondition =
  | EmptyCondition
  | NotEmptyCondition;

export type FilesPropertyFilterObject<T> = PropertyFilterObject & {
  files: { [k: string]: T }
};

export type FilesFilterObject = FilesPropertyFilterObject<boolean>;

export class FilesFilter extends TermFilter {
  constructor(
    property: string,
    conditions: FilesFilterCondition | FilesFilterCondition[],
  ) {
    super(property, conditions, 'files');
  }
  toJson(): FilesFilterObject[][] {
    return super.toJson();
  }
}