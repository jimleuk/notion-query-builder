**Notion-query-builder** is an opinionated filter query builder written in Typescript for use with the [official Notion javascript client](https://github.com/makenotion/notion-sdk-js).

Note: This software is not affliated with Notion Labs, Inc. Issues and/or support should relating to this library be directed to the project's [issue tracker](https://github.com/jimleuk/notion-query-builder/issues).

## Prerequisites
---
|Compatibility|Version Id|
|-|-|
|Notion API|2022-06-28|
|Notion JS SDK|v2.2.3+|
|Javascript|ES2019+

## Installation

---
### NodeJS
```
npm i notion-query-builder

// or alternatively, [yarn|pnpm] add notion-query-builder
```

### Deno
```
import nob from 'https://deno.land/x/notion-query-builder/mod.ts'
```

## Usage
---
This library serves as a utility to write compact yet manageable queries for the Notion API - it is not a replacement for the client. It does this by doing the following:
* **You do not write JSON directly**. This avoids large JSON objects clogging up your code, needing to remember structure and repetitive work.
* You instead use 3 components - **builders, queries and conditions** - to construct your query and only provide the values.
* You can use the components separately or mix with raw JSON if you prefer.

Once you have your query built, you execute the builder to output the JSON which defines your filter. This JSON is then used with the official client.

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

## Credits
---
`notion-query-builder` is inspired by [elastic-builder](https://github.com/sudo-suhas/elastic-builder) and the countless hours it has saved writing ElasticSearch queries.

## Licence
---
MIT

## Donate
---
A random charity appears!

**[Young Women's Trust](https://www.youngwomenstrust.org/donate/)**

Young Women’s Trust offers support to young women aged 18 to 30, who are living on low or no pay and want to build a better future, through Work It Out. Work It Out is a free service that offers coaching and personalised feedback on CV and job applications.

**Org**: Young Women's Trust, reg. charity no. 217868

**Donate**: https://www.youngwomenstrust.org/donate/