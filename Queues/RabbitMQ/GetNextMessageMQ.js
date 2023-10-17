'use strict';

const {
    CreateConnectionRabbitMQ
} = require('./ClientRabbitMQ');

exports.GetNextMessageMQ = async (queueName) => {
    let connectionRabbitMQ, channel;
    try {
        connectionRabbitMQ = await CreateConnectionRabbitMQ();
        channel = await connectionRabbitMQ.createChannel();
        await channel.assertQueue(queueName, {
            durable: true
        });
        const response = await channel.get(queueName, {
            'noAck': true
        });
        return response;
    } finally {
        if (channel)
            await channel.close();
        if (connectionRabbitMQ)
            await connectionRabbitMQ.close();
    }
}