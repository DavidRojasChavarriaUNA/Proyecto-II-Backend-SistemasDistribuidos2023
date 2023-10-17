'use strict';

const {
    amqplib
} = require('amqplib');

const CreateConnection = async () => {
    const connection = await amqplib.connect("amqps://diixhwfx:5pKtOyfeYhlRCAJ0QHmn2NsOydgskvNA@chimpanzee.rmq.cloudamqp.com/diixhwfx");
    //const connection = await amqp.connect(process.env.CLOUDAMQP_URL);
    return connection;
}

exports.CreateConnectionRabbitMQ = CreateConnection;