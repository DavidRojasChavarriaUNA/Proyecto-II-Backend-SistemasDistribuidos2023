'use strict';

const {
    clientMongoBD
} = require('./ClientDB');

exports.UpdateOne = async (dbName, collectionName, filter, data) => {
    try {
        await clientMongoBD.connect();
        const db = clientMongoBD.db(dbName);
        const collection = db.collection(collectionName);
        const updateData = {
            $set: data
        };
        const result = await collection.updateOne(filter, updateData);
        return {
            modifiedCount: result.modifiedCount,
            matchedCount: result.matchedCount
        };
    } finally {
        await clientMongoBD.close();
    }
}