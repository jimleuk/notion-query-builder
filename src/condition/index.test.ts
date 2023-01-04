import {
  EqualCondition,
  NotEqualCondition,
  ContainCondition,
  NotContainCondition,
  StartsWithCondition,
  EndsWithCondition,
  GreaterThanCondition,
  GreaterThanOrEqualToCondition,
  LessThanCondition,
  LessThanOrEqualToCondition,
  EmptyCondition,
  NotEmptyCondition,
  BeforeCondition,
  OnOrBeforeCondition,
  AfterCondition,
  OnOrAfterCondition,
  PastWeekCondition,
  PastMonthCondition,
  PastYearCondition,
  ThisWeekCondition,
  NextWeekCondition,
  NextMonthCondition,
  NextYearCondition,
} from '.';

test('EqualCondition', () => {
  expect(new EqualCondition('Notion').toJson()).toEqual([{ equals: 'Notion' }]);
  expect(new EqualCondition(['Notion']).toJson()).toEqual([{ equals: 'Notion' }]);
  expect(new EqualCondition(['Cola', 'Pepsi']).toJson()).toEqual([{ equals: 'Cola' }, { equals: 'Pepsi' }]);
});

test('NotEqualCondition', () => {
  expect(new NotEqualCondition('Notion').toJson()).toEqual([{ does_not_equal: 'Notion' }]);
  expect(new NotEqualCondition(['Notion']).toJson()).toEqual([{ does_not_equal: 'Notion' }]);
  expect(new NotEqualCondition(['Cola', 'Pepsi']).toJson()).toEqual([{ does_not_equal: 'Cola' }, { does_not_equal: 'Pepsi' }]);
});

test('ContainCondition', () => {
  expect(new ContainCondition('Notion').toJson()).toEqual([{ contains: 'Notion' }]);
  expect(new ContainCondition(['Notion']).toJson()).toEqual([{ contains: 'Notion' }]);
  expect(new ContainCondition(['Cola', 'Pepsi']).toJson()).toEqual([{ contains: 'Cola' }, { contains: 'Pepsi' }]);
});

test('NotContainCondition', () => {
  expect(new NotContainCondition('Notion').toJson()).toEqual([{ does_not_contain: 'Notion' }]);
  expect(new NotContainCondition(['Notion']).toJson()).toEqual([{ does_not_contain: 'Notion' }]);
  expect(new NotContainCondition(['Cola', 'Pepsi']).toJson()).toEqual([{ does_not_contain: 'Cola' }, { does_not_contain: 'Pepsi' }]);
});

test('StartsWithCondition', () => {
  expect(new StartsWithCondition('Notion').toJson()).toEqual([{ starts_with: 'Notion' }]);
  expect(new StartsWithCondition(['Notion']).toJson()).toEqual([{ starts_with: 'Notion' }]);
  expect(new StartsWithCondition(['Cola', 'Pepsi']).toJson()).toEqual([{ starts_with: 'Cola' }, { starts_with: 'Pepsi' }]);
});

test('EndsWithCondition', () => {
  expect(new EndsWithCondition('Notion').toJson()).toEqual([{ ends_with: 'Notion' }]);
  expect(new EndsWithCondition(['Notion']).toJson()).toEqual([{ ends_with: 'Notion' }]);
  expect(new EndsWithCondition(['Cola', 'Pepsi']).toJson()).toEqual([{ ends_with: 'Cola' }, { ends_with: 'Pepsi' }]);
});

test('GreaterThanCondition', () => {
  expect(new GreaterThanCondition(100).toJson()).toEqual([{ greater_than: 100 }]);
  expect(new GreaterThanCondition([100]).toJson()).toEqual([{ greater_than: 100 }]);
  expect(new GreaterThanCondition([100, 200]).toJson()).toEqual([{ greater_than: 100 }, { greater_than: 200 }]);
});

test('GreaterThanOrEqualToCondition', () => {
  expect(new GreaterThanOrEqualToCondition(100).toJson()).toEqual([{ greater_than_or_equal_to: 100 }]);
  expect(new GreaterThanOrEqualToCondition([100]).toJson()).toEqual([{ greater_than_or_equal_to: 100 }]);
  expect(new GreaterThanOrEqualToCondition([100, 200]).toJson()).toEqual([{ greater_than_or_equal_to: 100 }, { greater_than_or_equal_to: 200 }]);
});

test('LessThanCondition', () => {
  expect(new LessThanCondition(100).toJson()).toEqual([{ less_than: 100 }]);
  expect(new LessThanCondition([100]).toJson()).toEqual([{ less_than: 100 }]);
  expect(new LessThanCondition([100, 200]).toJson()).toEqual([{ less_than: 100 }, { less_than: 200 }]);
});

test('LessThanOrEqualToCondition', () => {
  expect(new LessThanOrEqualToCondition(100).toJson()).toEqual([{ less_than_or_equal_to: 100 }]);
  expect(new LessThanOrEqualToCondition([100]).toJson()).toEqual([{ less_than_or_equal_to: 100 }]);
  expect(new LessThanOrEqualToCondition([100, 200]).toJson()).toEqual([{ less_than_or_equal_to: 100 }, { less_than_or_equal_to: 200 }]);
});

test('EmptyCondition', () => {
  expect(new EmptyCondition().toJson()).toEqual([{ empty: true }]);
});

test('NotEmptyCondition', () => {
  expect(new NotEmptyCondition().toJson()).toEqual([{ is_not_empty: true }]);
});

test('BeforeCondition', () => {
  expect(new BeforeCondition('2023-01-01').toJson()).toEqual([{ before: '2023-01-01' }]);
  expect(new BeforeCondition(['2023-01-01']).toJson()).toEqual([{ before: '2023-01-01' }]);

  const date1 = new Date(Date.UTC(2023,0,1));
  const date2 = new Date(Date.UTC(2023,11,1));
  expect(new BeforeCondition(date1).toJson()).toEqual([{ before: date1 }]);
  expect(new BeforeCondition([date1, date2]).toJson()).toEqual([{ before: date1 }, { before: date2 }]);
});

test('OnOrBeforeCondition', () => {
  expect(new OnOrBeforeCondition('2023-01-01').toJson()).toEqual([{ on_or_before: '2023-01-01' }]);
  expect(new OnOrBeforeCondition(['2023-01-01']).toJson()).toEqual([{ on_or_before: '2023-01-01' }]);

  const date1 = new Date(Date.UTC(2023,0,1));
  const date2 = new Date(Date.UTC(2023,11,1));
  expect(new OnOrBeforeCondition(date1).toJson()).toEqual([{ on_or_before: date1 }]);
  expect(new OnOrBeforeCondition([date1, date2]).toJson()).toEqual([{ on_or_before: date1 }, { on_or_before: date2 }]);
});

test('AfterCondition', () => {
  expect(new AfterCondition('2023-01-01').toJson()).toEqual([{ after: '2023-01-01' }]);
  expect(new AfterCondition(['2023-01-01']).toJson()).toEqual([{ after: '2023-01-01' }]);

  const date1 = new Date(Date.UTC(2023,0,1));
  const date2 = new Date(Date.UTC(2023,11,1));
  expect(new AfterCondition(date1).toJson()).toEqual([{ after: date1 }]);
  expect(new AfterCondition([date1, date2]).toJson()).toEqual([{ after: date1 }, { after: date2 }]);
});

test('OnOrAfterCondition', () => {
  expect(new OnOrAfterCondition('2023-01-01').toJson()).toEqual([{ on_or_after: '2023-01-01' }]);
  expect(new OnOrAfterCondition(['2023-01-01']).toJson()).toEqual([{ on_or_after: '2023-01-01' }]);

  const date1 = new Date(Date.UTC(2023,0,1));
  const date2 = new Date(Date.UTC(2023,11,1));
  expect(new OnOrAfterCondition(date1).toJson()).toEqual([{ on_or_after: date1 }]);
  expect(new OnOrAfterCondition([date1, date2]).toJson()).toEqual([{ on_or_after: date1 }, { on_or_after: date2 }]);
});

test('relative time', () => {
  expect(new PastWeekCondition().toJson()).toEqual([{ past_week: {} }]);
  expect(new PastMonthCondition().toJson()).toEqual([{ past_month: {} }]);
  expect(new PastYearCondition().toJson()).toEqual([{ past_year: {} }]);
  expect(new ThisWeekCondition().toJson()).toEqual([{ this_week: {} }]);
  expect(new NextWeekCondition().toJson()).toEqual([{ next_week: {} }]);
  expect(new NextMonthCondition().toJson()).toEqual([{ next_month: {} }]);
  expect(new NextYearCondition().toJson()).toEqual([{ next_year: {} }]);
});