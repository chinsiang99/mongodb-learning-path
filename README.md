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