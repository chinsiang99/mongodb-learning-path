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