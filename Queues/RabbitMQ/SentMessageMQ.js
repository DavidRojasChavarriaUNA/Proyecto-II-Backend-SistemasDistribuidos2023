'use strict';

const {
    CreateConnectionRabbitMQ
} = require('./ClientRabbitMQ');

exports.SentMessageMQ = async (queueName, message) => {
    let connectionRabbitMQ, channel;
    try {
        connectionRabbitMQ = await CreateConnectionRabbitMQ();
        channel = await connectionRabbitMQ.createChannel();
        await channel.assertQueue(queueName, {
            durable: true
        });
        const response = await channel.sendToQueue(queueName, Buffer.from(message));
        return response;
    } finally {
        if (channel)
            await channel.close();
        if (connectionRabbitMQ)
            await connectionRabbitMQ.close();
    }
}