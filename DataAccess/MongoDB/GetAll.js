'use strict';

const {
    clientMongoBD
} = require('./ClientDB');

exports.GetAll = async (dbName, collectionName, filter) => {
    try {
        await clientMongoBD.connect();
        const db = clientMongoBD.db(dbName);
        const collection = db.collection(collectionName);
        const data = await collection.find(filter).toArray();
        return data;
    } finally {
        await clientMongoBD.close();
    }
}