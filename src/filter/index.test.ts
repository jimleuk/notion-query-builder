import {
  EqualCondition,
  ContainCondition,
  GreaterThanCondition,
  GreaterThanOrEqualToCondition,
  EmptyCondition,
  BeforeCondition,
} from '../condition';

import {
  TextFilter,
  NumberFilter,
  CheckboxFilter,
  SelectFilter,
  MultiSelectFilter,
  StatusFilter,
  DateFilter,
  PeopleFilter,
  FilesFilter,
  RelationFilter,
  RollUpFilter,
  FormulaFilter,
  CompoundFilter,
} from '.';

test('TextFilter (single condition, single value)', () => {
  const actual = new TextFilter('Name', new EqualCondition('Hello world'), 'title');
  const expected = [
    [{ property: 'Name', title: { equals: 'Hello world' }}]
  ];
  expect(actual.toJson()).toEqual(expected);
});

test('TextFilter (single condition, multiple values)', () => {
  const actual = new TextFilter('Name', new EqualCondition(['Hello', 'world']), 'title');
  const expected = [
    [
      { property: 'Name', title: { equals: 'Hello' } },
      { property: 'Name', title: { equals: 'world' } },
    ]
  ];
  expect(actual.toJson()).toEqual(expected);
});

test('TextFilter (multiple conditions, single value)', () => {
  const actual = new TextFilter('Name', 
    [new EqualCondition('Hello world'), new ContainCondition('Hello moon')],
    'title'
  );
  const expected = [
    [{ property: 'Name', title: { equals: 'Hello world' } }],
    [{ property: 'Name', title: { contains: 'Hello moon' } }],
  ];

  expect(actual.toJson()).toEqual(expected);
});

test('TextFilter (multiple conditions, multiple values)', () => {
  const actual = new TextFilter('Name', [
    new EqualCondition(['Hello', 'world']),
    new ContainCondition(['Hello', 'moon'])
  ], 'title');
  const expected = [
    [
      { property: 'Name', title: { equals: 'Hello' } },
      { property: 'Name', title: { equals: 'world' } },
    ],
    [
      { property: 'Name', title: { contains: 'Hello' } },
      { property: 'Name', title: { contains: 'moon' } },
    ],
  ];

  expect(actual.toJson()).toEqual(expected);
});

test('TextFilter - other text types', () => {
  const actual1 = new TextFilter('Name', new EqualCondition('Hello'), 'email').toJson();
  const actual2 = new TextFilter('Name', new EqualCondition('Hello'), 'phone_number').toJson();
  const actual3 = new TextFilter('Name', new EqualCondition('Hello'), 'rich_text').toJson();
  const actual4 = new TextFilter('Name', new EqualCondition('Hello'), 'url').toJson();

  const expected1 = [[{ property: 'Name', email: { equals: 'Hello' } }]];
  const expected2 = [[{ property: 'Name', phone_number: { equals: 'Hello' } }]];
  const expected3 = [[{ property: 'Name', rich_text: { equals: 'Hello' } }]];
  const expected4 = [[{ property: 'Name', url: { equals: 'Hello' } }]];

  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected3);
  expect(actual4).toEqual(expected4);
});

test('DateFilter - specific dates can be string or Date, although strings are not validated to be valid dates', () => {
  const actual1 = new DateFilter('birthday', new EqualCondition('2023-01-01')).toJson();
  const actual2 = new DateFilter('birthday', new EqualCondition(new Date(Date.UTC(2023,0,1)))).toJson();
  const expected1 = [[{ timestamp: "birthday", date: { equals: "2023-01-01" } }]];
  const expected2 = [[{ timestamp: "birthday", date: { equals: "2023-01-01T00:00:00.000Z" } }]];
  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
});

test('DateFilter - other date types', () => {
  const actual1 = new DateFilter('birthday', new EqualCondition('2023-01-01'), 'created_time').toJson();
  const actual2 = new DateFilter('birthday', new EqualCondition('2023-01-01'), 'last_edited_time').toJson();
  const expected1 = [[{ timestamp: "birthday", created_time: { equals: "2023-01-01" } }]];
  const expected2 = [[{ timestamp: "birthday", last_edited_time: { equals: "2023-01-01" } }]];
  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
});

test('PeopleFilter - other people types', () => {
  const actual1 = new PeopleFilter('profile', new EqualCondition('1111'), 'people').toJson();
  const actual2 = new PeopleFilter('profile', new EqualCondition('1111'), 'created_by').toJson();
  const actual3 = new PeopleFilter('profile', new EqualCondition('1111'), 'last_edited_by').toJson();

  const expected1 = [[{ property: "profile", people: { equals: "1111" } }]];
  const expected2 = [[{ property: "profile", created_by: { equals: "1111" } }]];
  const expected3 = [[{ property: "profile", last_edited_by: { equals: "1111" } }]];

  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected3);
});

test('RollUpFilter - basic example', () => {
  const actual = new RollUpFilter('any', new TextFilter('name', new ContainCondition('ian'))).toJson();
  const expected = [[{ property: 'name', rollup: { any: { rich_text: { contains: 'ian' } } } }]];
  expect(actual).toEqual(expected);
});

test('RollUpFilter - other rollup types', () => {
  const actual1 = new RollUpFilter('every', new TextFilter('name', new ContainCondition('ian'))).toJson();
  const actual2 = new RollUpFilter('none', new TextFilter('name', new ContainCondition('ian'))).toJson();
  const actual3 = new RollUpFilter('number', new NumberFilter('age', new GreaterThanCondition(12))).toJson();
  const actual4 = new RollUpFilter('date', new DateFilter('published_at', new BeforeCondition('2023-01-01'))).toJson();

  const expected1 = [[{ property: 'name', rollup: { every: { rich_text: { contains: 'ian' } } } }]];
  const expected2 = [[{ property: 'name', rollup: { none: { rich_text: { contains: 'ian' } } } }]];
  const expected3 = [[{ property: 'age', rollup: { number: { greater_than: 12 } } }]];
  const expected4 = [[{ timestamp: 'published_at', rollup: { date: { before: '2023-01-01' } } }]];
  
  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected3);
  expect(actual4).toEqual(expected4);
});

test('FormulaFilter - basic example', () => {
  const actual = new FormulaFilter('string', new TextFilter('name', new EqualCondition('jim'))).toJson();
  const expected = [[{ formula: { string: { equals : "jim" } }, property: "name" }]];
  expect(actual).toEqual(expected);
});

test('FormulaFilter - other types', () => {
  const actual1 = new FormulaFilter('checkbox', new CheckboxFilter('name', new EqualCondition(true))).toJson();
  const actual2 = new FormulaFilter('number', new NumberFilter('age', new EqualCondition(12))).toJson();
  const actual3 = new FormulaFilter('date', new DateFilter('published_at', new BeforeCondition('2023-01-01'))).toJson();

  const expected1 = [[{ property: "name", formula: { checkbox: { equals: true } } } ]];
  const expected2 = [[{ property: "age", formula: { number: { equals: 12 } } } ]];
  const expected3 = [[{ timestamp: "published_at", formula: { date: { before: "2023-01-01" } } } ]];

  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected2);
  expect(actual3).toEqual(expected3);
});

test('CompoundFilter (basic example)', () => {
  const actual = new CompoundFilter()
    .and(new TextFilter('firstName', new ContainCondition(['Jimmy', 'Timmy'])))
    .or(new TextFilter('lastName', new EqualCondition(['bigs', 'smalls'])))
    .toJson();
  const expected = {
    and: [
      {
        property: "firstName",
        rich_text: { contains: "Jimmy" },
      },
      {
        property: "firstName",
        rich_text: { contains: "Timmy" },
      },
    ],
    or: [
      {
        property: "lastName",
        rich_text: { equals: "bigs" },
      },
      {
        property: "lastName",
        rich_text: { equals: "smalls" },
      },
    ],
  };
  expect(actual).toEqual(expected);
});

test('CompoundFilter (and: checking all queries)', () => {
  const actual = new CompoundFilter()
    .and(new TextFilter('name', new EqualCondition('Timmy')))
    .and(new NumberFilter('age', new EqualCondition(25)))
    .and(new CheckboxFilter('registered', new EqualCondition(true)))
    .and(new SelectFilter('country of origin', new EqualCondition('united kingdom')))
    .and(new MultiSelectFilter('diet', new EqualCondition(['vegan', 'vegetarian', 'gluten-free'])))
    .and(new StatusFilter('Status', new EqualCondition('Complete')))
    .and(new DateFilter('published_date', new BeforeCondition(new Date(2023,0,1))))
    .and(new PeopleFilter('id', new ContainCondition('1234-5678-9999-99999999'), 'last_edited_by'))
    .and(new FilesFilter('file', new EmptyCondition()))
    .and(new RelationFilter('family', new ContainCondition('1234-5678-9999-99999999')))
    .and(new RollUpFilter('every', new NumberFilter('age', new GreaterThanCondition(123))))
    .and(new RollUpFilter('number', new NumberFilter('age', new GreaterThanOrEqualToCondition(123))))
    .and(new FormulaFilter('checkbox', new CheckboxFilter('registered', new EqualCondition(true))))
    .and(
      new CompoundFilter()
        .and(new TextFilter('emails', new EqualCondition('y')))
        .or(new TextFilter('emails', new EqualCondition('y')))
    )
    .toJson();

  const expected = {
    and: [
      {
        and: [{
          property: "emails",
          rich_text: { equals: "y" },
        }],
        or :[{
          property: "emails",
          rich_text: { equals: "y" },
        }]
      },
      {
        property: "name",
        rich_text: { equals: "Timmy" },
      },
      {
        number: { equals: 25 },
        property: "age",
      },
      {
        checkbox: { equals: true },
        property: "registered",
      },
      {
        property: "country of origin",
        select: { equals: "united kingdom" },
      },
      {
        multi_select: { equals: "vegan" },
        property: "diet",
      },
      {
        multi_select: { equals: "vegetarian" },
        property: "diet",
      },
      {
        multi_select: { equals: "gluten-free" },
        property: "diet",
      },
      {
        property: "Status",
        status: { equals: "Complete" },
      },
      {
        date: { before: '2023-01-01T00:00:00.000Z' },
        timestamp: "published_date",
      },
      {
        last_edited_by: { contains: "1234-5678-9999-99999999" },
        property: "id",
      },
      {
        files: { empty: true },
        property: "file",
      },
      {
        property: "family",
        relation: { contains: "1234-5678-9999-99999999" },
      },
      {
        property: "age",
        rollup: { every: { number: { greater_than: 123 } } },
      },
      {
        property: "age",
        rollup: { number: { greater_than_or_equal_to: 123 } },
      },
      {
        formula: { checkbox: { equals: true } },
        property: "registered",
      },
    ],
  };

  expect(actual).toEqual(expected);
});

test('CompoundFilter (or: checking all queries)', () => {
  const actual = new CompoundFilter()
    .or(new TextFilter('name', new EqualCondition('Timmy')))
    .or(new NumberFilter('age', new EqualCondition(25)))
    .or(new CheckboxFilter('registered', new EqualCondition(true)))
    .or(new SelectFilter('country of origin', new EqualCondition('united kingdom')))
    .or(new MultiSelectFilter('diet', new EqualCondition(['vegan', 'vegetarian', 'gluten-free'])))
    .or(new StatusFilter('Status', new EqualCondition('Complete')))
    .or(new DateFilter('published_date', new BeforeCondition(new Date(2023,0,1))))
    .or(new PeopleFilter('id', new ContainCondition('1234-5678-9999-99999999'), 'last_edited_by'))
    .or(new FilesFilter('file', new EmptyCondition()))
    .or(new RelationFilter('family', new ContainCondition('1234-5678-9999-99999999')))
    .or(new RollUpFilter('every', new NumberFilter('age', new GreaterThanCondition(123))))
    .or(new RollUpFilter('number', new NumberFilter('age', new GreaterThanOrEqualToCondition(123))))
    .or(new FormulaFilter('checkbox', new CheckboxFilter('registered', new EqualCondition(true))))
    .or(
      new CompoundFilter()
        .and(new TextFilter('emails', new EqualCondition('y')))
        .or(new TextFilter('emails', new EqualCondition('y')))
    )
    .toJson();

  const expected = {
    or: [
      {
        and: [{
          property: "emails",
          rich_text: { equals: "y" },
        }],
        or :[{
          property: "emails",
          rich_text: { equals: "y" },
        }]
      },
      {
        property: "name",
        rich_text: { equals: "Timmy" },
      },
      {
        number: { equals: 25 },
        property: "age",
      },
      {
        checkbox: { equals: true },
        property: "registered",
      },
      {
        property: "country of origin",
        select: { equals: "united kingdom" },
      },
      {
        multi_select: { equals: "vegan" },
        property: "diet",
      },
      {
        multi_select: { equals: "vegetarian" },
        property: "diet",
      },
      {
        multi_select: { equals: "gluten-free" },
        property: "diet",
      },
      {
        property: "Status",
        status: { equals: "Complete" },
      },
      {
        date: { before: '2023-01-01T00:00:00.000Z' },
        timestamp: "published_date",
      },
      {
        last_edited_by: { contains: "1234-5678-9999-99999999" },
        property: "id",
      },
      {
        files: { empty: true },
        property: "file",
      },
      {
        property: "family",
        relation: { contains: "1234-5678-9999-99999999" },
      },
      {
        property: "age",
        rollup: { every: { number: { greater_than: 123 } } },
      },
      {
        property: "age",
        rollup: { number: { greater_than_or_equal_to: 123 } },
      },
      {
        formula: { checkbox: { equals: true } },
        property: "registered",
      },
    ],
  };

  expect(actual).toEqual(expected);
});
