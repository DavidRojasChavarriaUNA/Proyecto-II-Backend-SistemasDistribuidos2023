'use strict';

const {
    GetNextMessageMQ
} = require('./GetNextMessageMQ');

const {
    SentMessageMQ
} = require('./SentMessageMQ')

const {
    CreateNewMessageMQ
} = require('./CreateNewMessageMQ')

exports.Queue = {
    GetNextMessageMQ,
    SentMessageMQ,
    CreateNewMessageMQ
}