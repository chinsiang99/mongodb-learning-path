# mongodb-learning-path
This repo is for me to learn mongodb with mongodb university (https://learn.mongodb.com/)

# Creating and Deploying Atlas Cluster
1. Organizations
- allow to group and define users and terms
- grant access to projects

2. Projects
- allow to define and organize resources (such as database cluster)
- we can create separate projects for development, testing and production

## Setting up cluster using cli
> atlas setup --clusterName myAtlasClusterEDU --provider AWS --currentIp --skipSampleData --username myAtlasDBUser --password myatlas-001 | tee atlas_cluster_details.txt

Organization name: "MY_MDB_ORG"
Project name: "MDB_EDU"
Cluster name: "myAtlasClusterEDU"
Database user: "myAtlasDBUser"
Password: "myatlas-001"
Permissions: "readWriteAnyDatabase"

## loading sample dataset
> atlas clusters sampleData load myAtlasClusterEDU

# MongoDB Database
- In this section, we will learn about how MongoDB is classified and commonly used
- How data is organized
- How MongoDB relates to Atlas

1. It is a general purpose document database
    - it structures data into documents (similiar to JSON object)
2. Document Model
    - easier to plan how application data will correspond to data in the database
    - can model data of any shape or data structure
    - document can model everything from key value pair, text, geospatial, time-series, graph data and more
    - we can use one format for any application

## Terms
1. Document
    - The basic unit of data in MongoDB
2. Collection
    - A grouping of documents
    - the documents do not have to have the same structure as MongoDB provides flexible model
3. Database
    - A container for collections

Relationship with Atlas
- The MongoDB Database is at the core of Atlas

# MongoDB Document Model
- the data is displayed in JSON but actualy it is stored in BSON (which is extension of JSON)
- BSON (Binary JSON) is a binary representation of JSON-like documents. It's used primarily by MongoDB to store and transfer data in a way that's both efficient and flexible. BSON extends the JSON data model to provide **additional data types**, such as int, long, date, floating point, and binary, that are not available in standard JSON.
- Every document requires an _id field, which act as a primary key
- If an inserted document doesn't include the _id field, MongoDB automatically generates an ObjectId for the _id field
- Documents may contain different fields, and fields may contain different types
- if we want to have a new field, just simply update the document with new field
- we can have optional schema validation as well, to set constraints on the structure of documents

# Data Modeling
- Data Modeling is the process of defining how data is stored and relationship that is among different entities
- When modeling, we can ask some questions:
1. What does my application do?
2. What data will I store?
3. How will users access this data?
4. What data will be most valuable to me?

- By asking these questions, you will know:
1. your tasks as well as those users
2. What your data looks like
3. The relationships among the data
4. The tooling you plan to have
5. The access patterns that might emerge

- Having a good data model can:
1. Make it easier to manage data
2. Make queries more efficient
3. Use less memories and CPU
4. reduce costs

Principle of MongoDB:
1. Data that is accessed together should be stored together
2. But, we can also normalize our data by using database references

# Types of data relationships in mongodb
1. One-to-One
2. One-to-many
3. Many-to-many

## Ways to model relationships
1. embedding
2. referencing

- in general, we should structure our data to match the ways that our application queries and updates it

<div align="center">
  <img src="./relationships.png" alt="relationships" width="200">
</div>

# Scaling Data Model
Optimum efficiency of:
1. query result times
2. memory usage
3. cpu usage
4. storage

Firstly, we need to avoid unbounded documents where docuements that grow infinitely

Problems as infinite array (posts that have infinity comments):
1. It will takes up more space in memory
2. may impact write performance
3. difficult to perform pagination of comments
4. maximum document size of 16MB will lead to storage problems

# Schema anti-patterns problem
1. Sub-optimal performance
2. Non-scalable solutions

## Common Schema anti-patterns
1. Massive arrays
2. Massive number of collections
3. bloated documents
4. unnecessary indexes
5. queries without indexes
6. data that accessed together but stored in different collections

# Connecting to a MongoDB Database
MongoDB provides two formats for the connection string:
1. Standard format
    - used to connect to standalone clusters, replica sets, or sharded clusters
2. DNS seed list format
    - provides a DNS server list to our connection string
    - gives more flexibility of deployment
    - ability to change servers in rotation without reconfiguring clients

# MongoDB CRUD Operations: Insert and Find Operations

## Inserting documents
1. insertOne()
> db.<collection>.insertOne()
- note that if the collection does not exist, it will automatically create the collection for you
2. insertMany() 
```bash
db.<collection>.insertMany([
    <document1>,
    <document2>,
    <document3>,
])
```

## Finding documents
1. find()
> db.<collection>.find()
2. in()
- $in operator allows us to select all documents that have a field value equal to any of the values specified in the array
> db.<collection>.find({city: {$in: ["PHOENIX", "CHICAGO"]}})

## Finding documents using Comparison operators
1. $gt (greater than)
2. $lt (lesser than)
3. $gte (greater or equal)
4. $lte (lesser or equal)

## Querying Arrays in documents
1. $elemMatch
- note that this is to match if there is only array (array searching only)

Find Documents with an Array That Contains a Specified Value
In the following example, "InvestmentFund" is not enclosed in square brackets, so MongoDB returns all documents within the products array that contain the specified value.

> db.accounts.find({ products: "InvestmentFund"})

Find a Document by Using the $elemMatch Operator
Use the $elemMatch operator to find all documents that contain the specified subdocument. For example:

```bash
db.sales.find({
  items: {
    $elemMatch: { name: "laptop", price: { $gt: 800 }, quantity: { $gte: 1 } },
  },
})
```

if only want array being mapped
> db.accounts.find({products: {$elemMatch: {$eq: "InvestmentStock"}}})

## Finding documents by using logical operators
1. $and
2. $or

Find a Document by Using Implicit $and
Use implicit $and to select documents that match multiple expressions. For example:

>db.routes.find({ "airline.name": "Southwest Airlines", stops: { $gte: 1 } })
Find a Document by Using the $or Operator
Use the $or operator to select documents that match at least one of the included expressions. For example:
```bash
db.routes.find({
  $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }],
})
```
Find a Document by Using the $and Operator
Use the $and operator to use multiple $or expressions in your query.
```bash
db.routes.find({
  $and: [
    { $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }] },
    { $or: [{ "airline.name": "American Airlines" }, { airplane: 320 }] },
  ]
})
```

# MongoDB CRUD Operations: Replace and Delete Operations

## Replacing document
1. replaceOne()
> db.<collection>.replaceOne(filter, replacement, options)

Replacing a Document in MongoDB
To replace documents in MongoDB, we use the replaceOne() method. The replaceOne() method takes the following parameters:

1. filter: A query that matches the document to replace.
2. replacement: The new document to replace the old one with.
3. options: An object that specifies options for the update.

example code:
```bash
db.books.replaceOne(
  {
    _id: ObjectId("6282afeb441a74a98dbbec4e"),
  },
  {
    title: "Data Science Fundamentals for Python and MongoDB",
    isbn: "1484235967",
    publishedDate: new Date("2018-5-10"),
    thumbnailUrl:
      "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
    authors: ["David Paper"],
    categories: ["Data Science"],
  }
)
```

## Updating documents
1. updateOne()
- update operators including $set and $push and upsert
> db.<collection>.updateOne(<filter>, <update>, {options})

The $set Operators:
- Adds new fields and values to a document
- Replaces the value of a field wit specified value

The $push operator:
- Appends a value to an array
- If absent, $push adds the array field with the value as its element

The upsert (update or insert):
- Insert a document with provided information if matching documents don't exist
- the update operations will be carried out


The updateOne() method accepts a filter document, an update document, and an optional options object. MongoDB provides update operators and options to help you update documents. In this section, we'll cover three of them: $set, upsert, and $push.

$set
The $set operator replaces the value of a field with the specified value, as shown in the following code:

```bash
db.podcasts.updateOne(
  {
    _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8"),
  },

  {
    $set: {
      subscribers: 98562,
    },
  }
)
```


upsert
The upsert option creates a new document if no documents match the filtered criteria. Here's an example:
```bash
db.podcasts.updateOne(
  { title: "The Developer Hub" },
  { $set: { topics: ["databases", "MongoDB"] } },
  { upsert: true }
)
```

$push
The $push operator adds a new value to the hosts array field. Here's an example:
```bash
db.podcasts.updateOne(
  { _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8") },
  { $push: { hosts: "Nic Raboy" } }
)
```

```bash
db.birds.updateOne(
  { _id: ObjectId('6286809e2f3fa87b7d86dccd') },
  { $push: { habitat: { $each: ["forests", "wetlands", "savanna"] } } }
)
```

Besides, we can use $inc to work as increment

## Updating documents by using findandmodify()

The findAndModify function in MongoDB is a powerful method that allows you to perform an atomic operation that finds a single document and modifies it in one step. It combines the find and update operations into a single, atomic operation.

Key Features of findAndModify:
Atomic Operations: Ensures that the find and modify operations are executed as a single atomic operation, which means the document is not altered by other operations in between.

Find and Update: It finds a document based on a query, updates it, and optionally returns the original or updated document.

Return Options: You can specify whether to return the document before the update (new: false) or after the update (new: true).

The findAndModify() method is used to find and replace a single document in MongoDB. It accepts a filter document, a replacement document, and an optional options object. The following code shows an example:
```bash
db.podcasts.findAndModify({
  query: { _id: ObjectId("6261a92dfee1ff300dc80bf1") },
  update: { $inc: { subscribers: 1 } },
  new: true,
})
```

## Updating MongoDB Documents by Using updateMany()
- note that updateMany is not an all-or-nothing operation, it will not roll back updates

To update multiple documents, use the updateMany() method. This method accepts a filter document, an update document, and an optional options object. The following code shows an example:
```bash
db.books.updateMany(
  { publishedDate: { $lt: new Date("2019-01-01") } },
  { $set: { status: "LEGACY" } }
)
```

## Deleting Documents in MongoDB
To delete documents, use the deleteOne() or deleteMany() methods. Both methods accept a filter document and an options object.

Delete One Document
The following code shows an example of the deleteOne() method:

> db.podcasts.deleteOne({ _id: Objectid("6282c9862acb966e76bbf20a") })

Delete Many Documents
The following code shows an example of the deleteMany() method:

> db.podcasts.deleteMany({category: “crime”})

# MongoDB CRUD Operations: Modifying Query Results

## Sorting and Limiting Query Results

Sorting Results
Use cursor.sort() to return query results in a specified order. Within the parentheses of sort(), include an object that specifies the field(s) to sort by and the order of the sort. Use 1 for ascending order, and -1 for descending order.

Syntax:

> db.collection.find(<query>).sort(<sort>)
Example:
```bash
// Return data on all music companies, sorted alphabetically from A to Z.
db.companies.find({ category_code: "music" }).sort({ name: 1 });
```

To ensure documents are returned in a consistent order, include a field that contains unique values in the sort. An easy way to do this is to include the _id field in the sort. Here's an example:
```bash
// Return data on all music companies, sorted alphabetically from A to Z. Ensure consistent sort order
db.companies.find({ category_code: "music" }).sort({ name: 1, _id: 1 });
```

Limiting Results
Use cursor.limit() to specify the maximum number of documents the cursor will return. Within the parentheses of limit(), specify the maximum number of documents to return.

Syntax:

> db.companies.find(<query>).limit(<number>)

Example:
```bash
// Return the three music companies with the highest number of employees. Ensure consistent sort order.
db.companies
  .find({ category_code: "music" })
  .sort({ number_of_employees: -1, _id: 1 })
  .limit(3);
```

## Returning Specific Data from a Query in MongoDB (projections)

Review the following code, which demonstrates how to return selected fields from a query.

Add a Projection Document
To specify fields to include or exclude in the result set, add a projection document as the second parameter in the call to db.collection.find().

Syntax:

> db.collection.find( <query>, <projection> )
Include a Field
To include a field, set its value to 1 in the projection document.

Syntax:

> db.collection.find( <query>, { <field> : 1 })
Example:
```bash
// Return all restaurant inspections - business name, result, and _id fields only
db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1 }
)
```

Exclude a Field
To exclude a field, set its value to 0 in the projection document.

Syntax:

> db.collection.find(query, { <field> : 0, <field>: 0 })
Example:
```bash
// Return all inspections with result of "Pass" or "Warning" - exclude date and zip code
db.inspections.find(
  { result: { $in: ["Pass", "Warning"] } },
  { date: 0, "address.zip": 0 }
)
```

While the _id field is included by default, it can be suppressed by setting its value to 0 in any projection.
```bash
// Return all restaurant inspections - business name and result fields only
db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1, _id: 0 }
)
```

## Counting Documents in a MongoDB Collection

Count Documents
Use db.collection.countDocuments() to count the number of documents that match a query. countDocuments() takes two parameters: a query document and an options document.

Syntax:

> db.collection.countDocuments( <query>, <options> )
The query selects the documents to be counted.

Examples:
```bash
// Count number of docs in trip collection
db.trips.countDocuments({})
// Count number of trips over 120 minutes by subscribers
db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" })
```

# Working with MongoDB Documents in Node.js

## BSON
- optimized for storage, retrieval, and transmission across the wire
- more secure than plain text JSON
- more data types than JSON

# MongoDB Aggregation

Aggregarion
- An analysis and summary of data

Stage
- An aggregation operation performed on the data
- A single operation on the data

Aggregation Pipeline
- a series of stages completed one at a time, in order

Pipeline
- A pipeline is where the data can be filtered, sorted, grouped or even transformed

Structure of an Aggregation Pipeline
```bash
db.collection.aggregate([
    {
        $stage1: {
            { expression1 },
            { expression2 }...
        },
        $stage2: {
            { expression1 }...
        }
    }
])
```

```bash
db.collection.aggregate([
  {$stage_name: {<expression>}},
  {$stage_name: {<expression>}}
])
```

## Using $match and $group Stages in a MongoDB Aggregation Pipeline

$match
- filter for documents matching criteria
- we can place as early as possible in the pipeline so it can use indexes
- reduces the number of documents
- lessens processing required
```bash
db.zips.aggregate([
  {
    $match: {"state": "CA"}
  }
])
```

$group
- create a single document for each distinct value
- it groups documents by a group key

expression:
```bash
{
  $group: {
    _id: <expression>, //group key
    <field>: {<accumulator>: <expression>}
  }
}
```

example:
```bash
{
  $group: {
    _id: "$city",
    totalZips: {$count: {}}
  }
}
```

aggragation pipeline with $match and $group:
```bash
db.zips.aggregate([
  {
    $match: {
      "state": "CA"
    }
  },
  {
    $group: {
      _id: "$city",
      totalZips: { $count: {} }
    }
  }
])
```

## Using $sort and $limit Stages in a MongoDB Aggregation Pipeline

$sort
- sorts all input documents and passes them through pipeline in sorted order

```bash
db.zips.aggregate([
  {
    $sort: {
      pop: -1
    }
  }
])
```

$limit
- limits the number of documents that are passed on to the next aggragation stage

```bash
db.zips.aggregate([
  {
    $sort: {
      pop: -1
    }
  },
  {
    $limit: 3
  }
])
```

Please note that **the order of stages matters**

## Using $project, $count, and $set Stages in a MongoDB Aggregation Pipeline

Review the following sections, which show the code for the $project, $set, and $count aggregation stages.

$project
The $project stage specifies the fields of the output documents. 1 means that the field should be included, and 0 means that the field should be supressed. The field can also be assigned a new value.

```bash
{
    $project: {
        state:1, 
        zip:1,
        population:"$pop",
        _id:0
    }
}
```

$set
The $set stage creates new fields or changes the value of existing fields, and then outputs the documents with the new fields.
```bash
{
    $set: {
        place: {
            $concat:["$city",",","$state"]
        },
        pop:10000
     }
  }

```
$count
The $count stage creates a new document, with the number of documents at that stage in the aggregation pipeline assigned to the specified field name.
```bash
{
  $count: "total_zips"
}
```

example:
```bash
db.sightings.aggregate([
  {
    $match: {
      date: {
        $gt: ISODate('2022-01-01T00:00:00.000Z'),
        $lt: ISODate('2023-01-01T00:00:00.000Z')
      },
      species_common: 'Eastern Bluebird'
    }
  }, {
    $count: 'bluebird_sightings_2022'
  }
])
```

## Using the $out Stage in a MongoDB Aggregation Pipeline
- it writes the documents that are returned by an aggregation pipeline into a collection
- it must be the last stage
- it create a new colleciton if it does not already exist
- if the colleciton exists, the $out replaces the existing collection with new data

```bash
db.sightings.aggregate([
  {
    $match: {
      date: {
        $gte: ISODate('2022-01-01T00:00:00.0Z'),
        $lt: ISODate('2023-01-01T00:00:00.0Z')
      }
    }
  },
  {
    $out: 'sightings_2022'
  }
])
```

# Using MongoDB Indexes in Collections
- What indexes are
- How indexes can improve performance
- Costs of using indexes
- most common index types

## What are indexes?
- special data structures
- store smallportion of the data
- ordered and easy to search efficiently

## Indexes can imporve performance
- speed up queries
- reduce disk I/O
- reduce resources required
- support equality matches and range-based operations and return sorted results

Without indexes
- MongoDB reads all documents (collection scan)
- sort results in memory

With indexes
- MongoDB only fetches the documents identified by the index based on the query
- return results faster

## Most common index types
- single field
- compound

# Creating a Single Field Index in MongoDB

Create a Single Field Index
Use createIndex() to create a new index in a collection. Within the parentheses of createIndex(), include an object that contains the field and sort order.
```bash
db.customers.createIndex({
  birthdate: 1
})
```

Create a Unique Single Field Index
Add {unique:true} as a second, optional, parameter in createIndex() to force uniqueness in the index field values. Once the unique index is created, any inserts or updates including duplicated values in the collection for the index field/s will fail.
```bash
db.customers.createIndex({
  email: 1
},
{
  unique:true
})
```
MongoDB only creates the unique index if there is no duplication in the field values for the index field/s.


View the Indexes used in a Collection
Use getIndexes() to see all the indexes created in a collection.

> db.customers.getIndexes()

Check if an index is being used on a query
Use explain() in a collection when running a query to see the Execution plan. This plan provides the details of the execution stages (IXSCAN , COLLSCAN, FETCH, SORT, etc.).

The IXSCAN stage indicates the query is using an index and what index is being selected.
The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
The FETCH stage indicates documents are being read from the collection.
The SORT stage indicates documents are being sorted in memory.
```bash
db.customers.explain().find({
  birthdate: {
    $gt:ISODate("1995-08-01")
    }
  })
db.customers.explain().find({
  birthdate: {
    $gt:ISODate("1995-08-01")
    }
  }).sort({
    email:1
    })
```

# Creating a Multikey Index in MongoDB
- how mongoDB works with array fields in an index
- any index where one of the indexed fields contain an array
- the array can hold nested objectes or other field types
- in a compound index, only one field can be an array per index

Create a Single field Multikey Index
Use createIndex() to create a new index in a collection. Include an object as parameter that contains the array field and sort order. In this example accounts is an array field.
```bash
db.customers.createIndex({
  accounts: 1
})
```

View the Indexes used in a Collection
Use getIndexes() to see all the indexes created in a collection.

> db.customers.getIndexes()

Check if an index is being used on a query
Use explain() in a collection when running a query to see the Execution plan. This plan provides the details of the execution stages (IXSCAN , COLLSCAN, FETCH, SORT, etc.).

The IXSCAN stage indicates the query is using an index and what index is being selected.
The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
The FETCH stage indicates documents are being read from the collection.
The SORT stage indicates documents are being sorted in memory.
```bash
db.customers.explain().find({
  accounts: 627788
  })
```

# Working with Compound Indexes in MongoDB
- what compund indexes are?
- how to create a compound index
- how to use a compound index to sort or cover queries
- The order of the fields in a compound index matters, the prefix is important
- we can follow this order: match -> sort -> range

Create a Compound Index
Use createIndex() to create a new index in a collection. Within the parentheses of createIndex(), include an object that contains two or more fields and their sort order.
```bash
db.customers.createIndex({
  active:1, 
  birthdate:-1,
  name:1
})
```
Order of Fields in a Compound Index
The order of the fields matters when creating the index and the sort order. It is recommended to list the fields in the following order: Equality, Sort, and Range.

Equality: field/s that matches on a single field value in a query
Sort: field/s that orders the results by in a query
Range: field/s that the query filter in a range of valid values
The following query includes an equality match on the active field, a sort on birthday (descending) and name (ascending), and a range query on birthday too.
```bash
db.customers.find({
  birthdate: {
    $gte:ISODate("1977-01-01")
    },
    active:true
    }).sort({
      birthdate:-1, 
      name:1
      })
```
Here's an example of an efficient index for this query:
```bash
db.customers.createIndex({
  active:1, 
  birthdate:-1,
  name:1
})
```

View the Indexes used in a Collection
Use getIndexes() to see all the indexes created in a collection.

> db.customers.getIndexes()

Check if an index is being used on a query
Use explain() in a collection when running a query to see the Execution plan. This plan provides the details of the execution stages (IXSCAN , COLLSCAN, FETCH, SORT, etc.). Some of these are:

The IXSCAN stage indicates the query is using an index and what index is being selected.
The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
The FETCH stage indicates documents are being read from the collection.
The SORT stage indicates documents are being sorted in memory.
```bash
db.customers.explain().find({
  birthdate: {
    $gte:ISODate("1977-01-01")
    },
  active:true
  }).sort({
    birthdate:-1,
    name:1
    })
```
Cover a query by the Index
An Index covers a query when MongoDB does not need to fetch the data from memory since all the required data is already returned by the index.

In most cases, we can use projections to return only the required fields and cover the query. Make sure those fields in the projection are in the index.

By adding the projection {name:1,birthdate:1,_id:0} in the previous query, we can limit the returned fields to only name and birthdate. These fields are part of the index and when we run the explain() command, the execution plan shows only two stages:

IXSCAN - Index scan using the compound index
PROJECTION_COVERED - All the information needed is returned by the index, no need to fetch from memory
```bash
db.customers.explain().find({
  birthdate: {
    $gte:ISODate("1977-01-01")
    },
  active:true
  },
  {name:1,
    birthdate:1, 
    _id:0
  }).sort({
    birthdate:-1,
    name:1
    })
```

# Deleting MongoDB Indexes
- make sure that the index is not being used
- deleting an index that's the only index supporting a query will affect the performance of the query
- recreating an index takes time and resource
- hide the index before deleting it
- db.collection.hideIndex(<index>)

View the Indexes used in a Collection
Use getIndexes() to see all the indexes created in a collection. There is always a default index in every collection on _id field. This index is used by MongoDB internally and cannot be deleted.

> db.customers.getIndexes()

Delete an Index
Use dropIndex() to delete an existing index from a collection. Within the parentheses of dropIndex(), include an object representing the index key or provide the index name as a string.

Delete index by name:
```bash
db.customers.dropIndex(
  'active_1_birthdate_-1_name_1'
)
```
Delete index by key:
```bash
db.customers.dropIndex({
  active:1,
  birthdate:-1, 
  name:1
})
```
Delete Indexes
Use dropIndexes() to delete all the indexes from a collection, with the exception of the default index on _id.

> db.customers.dropIndexes()
The dropIndexes() command also can accept an array of index names as a parameter to delete a specific list of indexes.
```bash
db.collection.dropIndexes([
  'index1name', 'index2name', 'index3name'
  ])
```