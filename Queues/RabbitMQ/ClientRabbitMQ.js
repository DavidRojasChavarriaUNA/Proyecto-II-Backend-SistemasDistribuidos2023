'use strict';

const {
    amqplib
} = require('amqplib');

const CreateConnection = async () => {
    const connection = await amqplib.connect(process.env.CLOUDAMQP_URL);
    return connection;
}

exports.CreateConnectionRabbitMQ = CreateConnection;