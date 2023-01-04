import { EqualCondition } from '../condition';
import { TextFilter, CompoundFilter } from '../filter';
import { FilterQuery } from '.';

test('FilterQuery - basic example', () => {
  const actual1 = new FilterQuery(new TextFilter('abc', new EqualCondition('123'))).toJson();
  const actual2 = new FilterQuery(new CompoundFilter().and(new TextFilter('abc', new EqualCondition('123')))).toJson();
  const expected1 = { property: "abc", rich_text: { equals: "123" } };
  const expected2 = { and: [ { property: "abc", rich_text: { equals: "123" } } ] };

  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
});

test('FilterQuery - when given an array of child filters, autowrap in a compoundQuery', () => {
  const actual = new FilterQuery([
    new TextFilter('firstname', new EqualCondition('tiny')),
    new TextFilter('lastname', new EqualCondition('tim'))
  ]).toJson();
  const expected = {
    and: [
      { property: "firstname", rich_text: { equals: "tiny" } },
      { property: "lastname", rich_text: { equals: "tim" } },
    ]
  }
  expect(actual).toEqual(expected);
});