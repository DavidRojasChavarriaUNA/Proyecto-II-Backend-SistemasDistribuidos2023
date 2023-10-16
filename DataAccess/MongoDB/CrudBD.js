'use strict';

const {
    GetAll
} = require('./GetAll');

const {
    GetOne
} = require('./GetOne');

const {
    InsertOne
} = require('./InsertOne')

const {
    UpdateOne
} = require('./UpdateOne')

const {
    DeleteOne
} = require('./DeleteOne')

exports.Crud = {
    GetAll,
    GetOne,
    InsertOne,
    UpdateOne,
    DeleteOne
}