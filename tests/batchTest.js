const { producer_list } = require("../producer/producer");
const kafka = require('../kafka_broker/connection');

let batch = [
    {
        "topic":"consumer1",
        "messages":[{"value":"Hello"}]
    },
    {
        "topic":"consumer2",
        "messages":[{"value":"World"}]
    },
    {
        "topic":"consumer3",
        "messages":[{"value":"People"}]
    }
];

producer_list.batch_producer(batch,kafka)
.then(console.log)
.catch(console.log);