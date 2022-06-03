const { Kafka } = require("kafkajs");

module.exports = (() => {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
        requestTimeout: 30000,
        retry:10,
    });
    return kafka;
})()
