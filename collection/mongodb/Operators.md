# MongoDB Query operators

| Category       | Operator        | Description                                             |
| -------------- | --------------- | ------------------------------------------------------- |
| **Comparison** | `$eq`           | Equal to                                                |
|                | `$ne`           | Not equal to                                            |
|                | `$gt`           | Greater than                                            |
|                | `$gte`          | Greater than or equal to                                |
|                | `$lt`           | Less than                                               |
|                | `$lte`          | Less than or equal to                                   |
|                | `$in`           | Value is in the given array                             |
|                | `$nin`          | Value is not in the given array                         |
| **Logical**    | `$and`          | Join query clauses with logical AND                     |
|                | `$or`           | Join query clauses with logical OR                      |
|                | `$not`          | Inverts the effect of a query expression                |
|                | `$nor`          | Match documents that fail all the query expressions     |
| **Element**    | `$exists`       | Checks if a field exists                                |
|                | `$type`         | Matches documents with a specified data type            |
| **Evaluation** | `$expr`         | Allows use of aggregation expressions in queries        |
|                | `$regex`        | Matches strings using regular expressions               |
|                | `$mod`          | Performs modulo operation                               |
|                | `$text`         | Performs text search on indexed fields                  |
|                | `$where`        | Uses JavaScript expressions (use with caution)          |
| **Array**      | `$all`          | Matches arrays that contain all specified elements      |
|                | `$elemMatch`    | Matches documents if at least one array element matches |
|                | `$size`         | Matches arrays with the specified number of elements    |
| **Bitwise**    | `$bitsAllClear` | All bits are 0                                          |
|                | `$bitsAllSet`   | All bits are 1                                          |
|                | `$bitsAnyClear` | At least one bit is 0                                   |
|                | `$bitsAnySet`   | At least one bit is 1                                   |
