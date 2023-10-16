'use strict';

const {
    clientMongoBD
} = require('./ClientDB');

exports.InsertOne = async (dbName, collectionName, data) => {
    try {
        await clientMongoBD.connect();
        const db = clientMongoBD.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);
        return {
            insertedId: result.insertedId
        };
    } finally {
        await clientMongoBD.close();
    }
}