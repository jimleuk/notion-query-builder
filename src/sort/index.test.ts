import { Sort, SortProperty, SortTime } from '.';

test('Sort - basic example', () => {
  const actual1 = new Sort<SortProperty>('age').toJson();

  expect(actual1).toEqual({
    property: 'age',
    direction: 'descending'
  });
});

test('Sort - created_time and last_edited_time returns instance of SortTime', () => {
  const actual1 = new Sort<SortTime>('created_time').toJson();
  const actual2 = new Sort<SortTime>('last_edited_time').toJson();

  expect(actual1).toEqual({
    timestamp: 'created_time',
    direction: 'descending',
  });
  expect(actual2).toEqual({
    timestamp: 'last_edited_time',
    direction: 'descending'
  });
});