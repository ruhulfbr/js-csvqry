# Query on CSV

**Query on CSV** allows you to perform queries on CSV.

## Use Cases

This package is suitable for you if you need to perform some queries on:

-   Perform SELECT query
-   Perform where query (where, orWhere, whereIn, whereDate e.t.c)
-   Perform Sorting
-   Perform Limit, Offset
-   Perform Aggregate Query (count, sum, avg, max, min)

## Installation

```bash
npm i csvqry
```

or

```bash
yarn add csvqry
```

## Basic Usage

Just import/require the package before start using it.

As a Node.js Package

```js
const csvq = require("csvqry");
```

As a ES6 Module

```js
import csvq from "csvqry";
```

```js
(async () => {
    try {
        const qb = await csvq.from("example.csv");
        let result = qb.get();

        console.log(result);
    } catch (error) {
        console.error("Error initializing csvq:", error);
    }
})();
```

## Querying, sorting and get results

You can perform queries on your csv:

```js
let qb = await csvq.from("example.csv");

let result = qb
    .select("id", "name")
    //.select(['id', 'name'])
    .where("id", 2)
    //.where('id', '>' ,2)
    .orWhere("id", 3)
    //.orWhere('id', '>=', 3)
    .whereDate("dob", "2010-10-10")
    //.whereDate('dob', '>=','2010-10-10')
    .whereLike("name", "ruhul")
    //.whereLike('name', 'ruhul', 'start')
    //.whereLike('name', 'ruhul', 'end')
    .whereIn("age", [22, 23, 25, 26])
    .whereNotIn("age", [11, 12, 13])

    .orderBy("id")
    //.orderBy('id', 'desc')
    //.orderBy('id', 'asc')
    //.latest('id')  // Default Id
    //.oldest('id')  // Default Id
    .get();
```

### More Example

```js
let qb = await csvq.from("example.csv");

// To Get All Result
const result = qb.all();

// To Get All Sorted Result
const result = qb.orderBy("id", "desc").all();

// To Get Specific Row
const result = qb.where("id", 1).row();

// To Get First Result
const result = qb.where("id", 1).first();

// To Get Last Result
const result = qb.where("id", 1).last();

// To Get nth row
const result = qb.getNth(2); // [0-n]

// Check Is row exist
const result = qb.where("id", 1).hasData(); // boolean
const result = qb.where("id", 1).exist(); // boolean

// To Get All Sorted Result
const result = qb.orderBy("id", "desc").all();
```

### Available where operators

-   `=` (default operator, can be omitted)
-   `>`
-   `<`
-   `<=`
-   `>=`
-   `!=`

### Available sorting operators

-   `ASC`
-   `DESC` (default operator, can be omitted)
-   `asc`
-   `desc`

## Limit and Offset

You can add criteria and specify limit and offset for your query results:

```js
let qb = await csvq.from("example.csv");
const result = qb
    .select("*")
    .orderBy("id")
    .limit(10)
    //.limit(10, 2)
    .get();
```

## Aggregator Query

You can add criteria and specify limit and offset for your query results:

```js
let qb = await csvq.from("example.csv");

// To Get Count
const result = qb.count();

// To Get Sum
const result = qb.sum("age");

// To Get Average
const result = qb.avg("age");

// To Get row with minimum column value
const result = qb.min("age");

// To Get row with maximum column value
const result = qb.max("age");
```

## Support

If you found an issue or had an idea please refer [to this section](https://github.com/ruhulfbr/js-csvqry/issues).

## Authors

-   **Md Ruhul Amin** - [Github](https://github.com/ruhulfbr)
