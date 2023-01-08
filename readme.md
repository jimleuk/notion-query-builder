# Notion-query-builder

**Notion-query-builder** is an opinionated filter query builder written in Typescript for use with the [official Notion javascript client](https://github.com/makenotion/notion-sdk-js).

Note: This software is not affliated with Notion Labs, Inc. Issues and/or support should relating to this library be directed to the project's [issue tracker](https://github.com/jimleuk/notion-query-builder/issues).

## Prerequisites

|Compatibility|Version Id|
|-|-|
|Notion API|2022-06-28|
|Notion JS SDK|v2.2.3+|
|Javascript|ES2019+

## Installation

### NodeJS
```
npm i notion-query-builder

// or alternatively, [yarn|pnpm] add notion-query-builder
```

### Deno
```
import nob from 'https://deno.land/x/notion_query_builder/mod.ts'

// note: for a smaller package size, try the npm version as it's stripped of development artifacts
import nob from 'npm:notion-query-builder'
```

## Usage

As your filter queries become more complex, so does the size of the JSON you'll write for them. Large unwieldy blocks of JSON are always a hassle to reason about and maintain - often, solutions to manage this data utimately leads to code bloat.

`node-query-builder` offers a simple and easy-to-use API to write **filters** and **conditions** programatically, reducing the effort and amount of code required by many factors.

To get started, here's a high level overview of the library:
* filters and conditions are functions which combine to construct a query.
* Usually, filters take conditions as arguments but special filters may take other filters as arguments
* To use with the client, the constructed query needs to return its JSON output. This is usually done by calling the `toJSON()` method.

```
import { Client } from '@notionhq/client';
import nob from 'notion-query-builder';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const myFilter = nob.filterQuery([
  nob.checkboxFilter('Published', nob.equal(true)),
  nob.multiSelectFilter('Tags', nob.contains(['A', 'B']))
]);

const response = await notion.databases.query({
  database_id: databaseId,
  filter: myFilter.toJson()
});
```
<details>
  <summary>console.log(myFilter.toJson())</summary>

  ```
  {
    "and": [
      {
        "property": "Published",
        "checkbox": {
          "equals": true
        }
      },
      {
        "property": "Tags",
        "multi_select": {
          "contains": "A"
        }
      },
      {
        "property": "Tags",
        "multi_select": {
          "contains": "B"
        }
      }
    ]
  }
  ```
</details>

## API Reference

Full API documentation and examples can be found at [https://jimleuk.github.io/notion-query-builder/](https://jimleuk.github.io/notion-query-builder/).

This library aims to match closely with the official Notion API. As such, please also refer to the [official Notion API documentation](https://developers.notion.com/reference/post-database-query-filter). For any inconsistencies, please raise a ticket in the project's [issue tracker](https://github.com/jimleuk/notion-query-builder/issues).


### Conditions
These **conditions** take native data types as arguments.

|method|alias|example|
|-|-|-|
|equal|`eq`,`equal`,`equals`,`is`,`be`|`nob.equal('hello world')`|
|notEqual|`neq`,`notEqual`,`notEquals`,`isnt`,`isNot`|`nob.notEqual('hello world')`|
|contain|`contain`,`contains`,`has`,`include`,`includes`|`nob.contain('hello world')`|
|notContain|`notContain`,`notContains`,`doesNotContain`,`hasNot`,`exclude`,`excludes`,|`nob.notContain('hello world')`|
|startsWith|`startsWith`|`nob.startsWith('hello')`|
|endsWith|`endsWith`|`nob.endsWith('world')`|
|greaterThan|`gt`,`greaterThan`,`moreThan`|`nob.greaterThan(9999)`|
|greaterThanOrEqualTo|`gte`,`greaterThanOrEqualTo`,`moreThanOrEqualTo`|`nob.greaterThanOrEqualTo(9999)`|
|lessThan|`lt`,`lessThan`|`nob.lessThan(9999)`|
|lessThanOrEqualTo|`lte`,`lessThanOrEqualTo`|`nob.lessThanOrEqualTo(9999)`|
|empty|`empty`,`isEmpty`,`notExist`|`nob.empty()`|
|NotEmpty|`notEmpty`,`isNotEmpty`,`exists`|`nob.notEmpty()`|
|before|`before`|`nob.before('2023-01-01)`, `nob.before(new Date(2023,0,1))`|
|onOrBefore|`onOrBefore`|`nob.onOrBefore('2023-01-01)`|
|after|`after`|`nob.after('2023-01-01)`, `nob.after(new Date(2023,0,1))`|
|onOrAfter|`onOrAfter`|`nob.onOrAfter('2023-01-01)`|
|pastWeek|`pastWeek`|`nob.pastWeek()`|
|pastMonth|`pastMonth`|`nob.pastMonth()`|
|pastYear|`pastYear`|`nob.pastYear()`|
|thisWeek|`thisWeek`|`nob.thisWeek()`|
|nextWeek|`nextWeek`|`nob.nextWeek()`|
|nextMonth|`nextMonth`|`nob.nextMonth()`|
|nextYear|`nextYear`|`nob.nextYear()`|

### Term Level Filters
These **filters** take **conditions** as arguments.

|method|example|
|-|-|
|textFilter|`nob.textFilter('name', nob.contains('notion'), 'title')`|
|numberFilter|`nob.numberFilter('age', nob.gte(12))`|
|checkboxFilter|`nob.checkboxFilter('name', nob.eq(true))`|
|selectFilter|`nob.selectFilter('name', nob.eq('notion'))`|
|multiSelectFilter|`nob.multiSelectFilter('name', nob.eq('notion'))`|
|statusFilter|`nob.statusFilter('status', nob.eq(['todo', 'in progress']))`|
|dateFilter|`nob.dateFilter('name', nob.before('2023-01-01))`|
|peopleFilter|`nob.peopleFilter('name', nob.eq('notion'))`|
|filesFilter|`nob.filesFilter('name', nob.eq('notion'))`|
|relationFilter|`nob.relationFilter('name', nob.eq('notion'))`|

### Queries and Special Filters
These **queries** and **special filters** take **term level filters** as arguments.

|method|example|
|-|-|
|filterQuery|`nob.filterQuery(nob.textQuery('name', nob.eq('notion'))`|
|rollUpFilter|`nob.rollUpFilter('every', nob.numberFilter('age', nob.gte(10)))`|
|formulaFilter|`nob.formulaFilter('number', nob.numberFilter('age', nob.gte(10))`|
|compoundFilter|`nob.compoundFilter().and(nob.textFilter('name', nob.eq('notion'))).or(nob.numberFilter('age', nob.gte(10)))`|

### Sort
The `Sort()` function will switch between `propertySort` and `TimestampSort` depending on the field given. Sort Direction is optional and defaults to `descending`.

|methods|examples|
|-|-|
|sort|`nob.sort('age')`, `nob.sort('age', 'ascending)`, `nob.sort('created_time', 'ascending)`|

## Tests

Run unit tests.
```
npm test
```

## Credits

`notion-query-builder` is inspired by [elastic-builder](https://github.com/sudo-suhas/elastic-builder) and the countless hours it has saved writing ElasticSearch queries.

## Licence
MIT

## Donate
A random charity appears!

**[Young Women's Trust](https://www.youngwomenstrust.org/donate/)**

Young Women’s Trust offers support to young women aged 18 to 30, who are living on low or no pay and want to build a better future, through Work It Out. Work It Out is a free service that offers coaching and personalised feedback on CV and job applications.

**Org**: Young Women's Trust, reg. charity no. 217868

**Donate**: https://www.youngwomenstrust.org/donate/