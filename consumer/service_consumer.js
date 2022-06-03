const kafka = require('../kafka_broker/connection');
let count = 0;
let consumer_list = {
    consumer1: async () => {
        consumer = kafka.consumer({ groupId: 'my-group' });
        consumer.connect();
        console.log('Started Listening ...');
        await consumer.subscribe({ topic: 'consumer1', fromBeginning: false });
        await consumer.subscribe({ topic: 'consumer2', fromBeginning: false });
        await consumer.subscribe({ topic: 'consumer3', fromBeginning: false });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`*** CONSUMER - LISTENING TO ${topic} ***`)
                console.log(message.value.toString());
                console.log('*** END  ***')
            },
        })
        .catch(err => { console.log(`Error in CONSUMER RUN`) });
    },
    // consumer2: async () => {
    //     consumer = kafka.consumer({ groupId: 'my-group' });
    //     consumer.connect();
    //     console.log('Started Listening ...');
    //     await consumer.subscribe({ topic: 'consumer2', fromBeginning: true });

    //     await consumer.run({
    //         eachMessage: async ({ topic, partition, message }) => {
    //             console.log(`******************* CONSUMER 2 - LISTENING TO ${topic} ****************`)
    //             console.log(message.value.toString());
    //             console.log('************************ END  ***************************')

    //         },
    //     })
    //     .catch(err => { console.log(`Error in CONSUMER RUN`) });
    // },
    // consumer3: async () => {
    //     consumer = kafka.consumer({ groupId: 'my-group' });
    //     consumer.connect();
    //     console.log('Started Listening ...');
    //     await consumer.subscribe({ topic: 'consumer3', fromBeginning: true });

    //     await consumer.run({
    //         eachMessage: async ({ topic, partition, message }) => {
    //             console.log(`******************* CONSUMER 3 - LISTENING TO ${topic} ****************`)
    //             console.log(message.value.toString());
    //             console.log('************************ END  ***************************')

    //         },
    //     })
    //     .catch(err => { console.log(`Error in CONSUMER RUN`) });
    // },
}

consumer_list.consumer1().catch(err=>{console.log('Error in consumer 1')});
// consumer_list.consumer2().catch(err=>{console.log('Error in consumer 2')});
// consumer_list.consumer3().catch(err=>{console.log('Error in consumer 3')});