# MongoDB Cheat sheet

## Connecting to MongoDB

### Connect to MongoDB shell

```sh
mongosh
```

### Connect to a specific database

```sh
mongosh "mongodb://localhost:27017/mydatabase"
```

## Database Commands

### Show all databases

```sh
show dbs
```

### Switch to a database (or create if it doesn’t exist)

```sh
use mydatabase
```

### Drop the current database

```sh
db.dropDatabase()
```

## Collection Commands

### Show all collections

```sh
show collections
```

### Create a collection

```sh
db.createCollection("users")
```

### Drop a collection

```sh
db.users.drop()
```

## CRUD Operations

### Insert a document

```sh
db.users.insertOne({ name: "John", age: 30 })
```

### Insert multiple documents

```sh
db.users.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 28 }
])
```

### Find all documents

```sh
db.users.find()
```

### Find a document with a condition

```sh
db.users.findOne({ name: "Alice" })
```

### Update a document

```sh
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 26 } }
)
```

### Update multiple documents

```sh
db.users.updateMany(
  { age: { $gt: 25 } },
  { $set: { status: "Active" } }
)
```

### Delete a document

```sh
db.users.deleteOne({ name: "Bob" })
```

### Delete multiple documents

```sh
db.users.deleteMany({ age: { $lt: 25 } })
```

## Indexing

### Create an index

```sh
db.users.createIndex({ name: 1 })
```

### Show indexes

```sh
db.users.getIndexes()
```

### Drop an index

```sh
db.users.dropIndex("name_1")
```

## Aggregation

### Basic aggregation pipeline

```sh
db.users.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $group: { _id: "$status", total: { $sum: 1 } } }
])
```

## Transactions

### Start a transaction

```sh
const session = db.getMongo().startSession();
session.startTransaction();
```

### Commit a transaction

```sh
session.commitTransaction();
session.endSession();
```

### Abort a transaction

```sh
session.abortTransaction();
session.endSession();
```

## User & Roles

### Create a new user

```sh
db.createUser({
  user: "admin",
  pwd: "password123",
  roles: [{ role: "readWrite", db: "mydatabase" }]
})
```

### Show users

```sh
db.getUsers()
```

### Remove a user

```sh
db.dropUser("admin")
```

## Backup & Restore

### Backup a database

```sh
mongodump --db=mydatabase --out=/backup/
```

### Restore a database

```sh
mongorestore --db=mydatabase /backup/mydatabase
```

## Performance & Monitoring

### Get database statistics

```sh
db.stats()
```

### Get collection statistics

```sh
db.users.stats()
```

### Monitor query performance

```sh
db.setProfilingLevel(2)
```

## Replication

### Check replica set status

```sh
rs.status()
```

### Initiate a replica set

```sh
rs.initiate()
```

### Add a member to a replica set

```sh
rs.add("mongodb2:27017")
```

### Remove a member from a replica set

```sh
rs.remove("mongodb2:27017")
```

## Sharding

### Enable sharding for a database

```sh
sh.enableSharding("mydatabase")
```

### Shard a collection

```sh
sh.shardCollection("mydatabase.users", { "_id": 1 })
```

### Check sharding status

```sh
sh.status()
```
