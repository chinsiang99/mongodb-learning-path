const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGODB_URI
console.log("this is uri", uri)
const client = new MongoClient(uri)

const dbName = 'bank'
const collection_name  = 'accounts'

const accountsCollections = client.db(dbName).collection(collection_name)

// connect to database
const connectToDatabase = async () => {
    try{
        await client.connect()
        console.log("trying to connect")
    }catch(err){
        console.error(`error occured: ${err}`)
    }
}

const simpleAccount = {
    account_holder: "Chin Siang",
    account_id: "CHIN00192",
    account_type: 'checking',
    balance: 12738218,
    last_update: new Date()
}

const main = async () => {
    try{
        await connectToDatabase()
        let result = await accountsCollections.insertOne(simpleAccount)
        console.log(`${result.insertedId}`)
    }catch(err){
        console.log(`error occured: ${err}`)
    } finally{
        await client.close()
        console.log("connection closed")
    }
}

main()