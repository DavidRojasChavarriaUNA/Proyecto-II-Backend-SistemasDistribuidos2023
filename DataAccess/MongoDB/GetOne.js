'use strict';

const {
    clientMongoBD
} = require('./ClientDB');

exports.GetOne = async (dbName, collectionName, filter) => {
    try {
        await clientMongoBD.connect();
        const db = clientMongoBD.db(dbName);
        const collection = db.collection(collectionName);
        const data = await collection.findOne(filter);
        return data;
    } finally {
        await clientMongoBD.close();
    }
}