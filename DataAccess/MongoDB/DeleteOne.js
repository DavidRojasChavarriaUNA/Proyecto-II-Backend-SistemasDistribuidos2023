'use strict';

const {
    clientMongoBD
} = require('./ClientDB');

exports.DeleteOne = async (dbName, collectionName, filter) => {
    try {
        await clientMongoBD.connect();
        const db = clientMongoBD.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne(filter);
        return {
            deletedCount: result.deletedCount
        };
    } finally {
        await clientMongoBD.close();
    }
}