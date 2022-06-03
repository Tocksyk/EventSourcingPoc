const kafka = require('../kafka_broker/connection');
const { producer_list } = require('../producer/producer');

var consumer,found_topic,batch
let producer = kafka.producer();

async function listeningKafka() {
    consumer = kafka.consumer({ groupId: 'my-group1' });
    consumer.connect();
    console.log('Started Listening ...');
    await consumer.subscribe({ topic: 'POC_messages', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`*** START LISTENING TO ${topic} ***`)
            console.log(message.value.toString());
            console.log('*** END  ***');

            // // LOGIC TO CALCULATE THE REQUIRE TOPIC
            // found_topic = config.topics[0];

            consumer.pause();
            let batch = [
                {
                    "topic":"consumer1",
                    "messages":[{"value":`${message.value.toString() +'1 on 1'}`}]
                },
                {
                    "topic":"consumer2",
                    "messages":[{"value":`${message.value.toString() +'2 on 2'}`}]
                },
                {
                    "topic":"consumer3",
                    "messages":[{"value":`${message.value.toString() +'3 on 3'}`}]
                }
            ];
            // console.log(`Batch : ${batch}`);

            // CALLING GENERIC PRODUCER WITH REQUIRED TOPIC
            // await producer_list.generic_producer(found_topic,kafka,message.value.toString())
            // .catch(err=>{console.log(`Error in GENERIC PRODUCER called from CONSUMER ==> `,err.message)});
            
            await producer_list.batch_producer(batch,producer).catch(err=>{console.log('Error in BATCH PRODUCER')});
            // consumer.resume();
            // console.log('Waiting 3 seconds...................................................................');
            // setTimeout(async () => {
            //     await producer_list.batch_producer(batch,kafka).catch(err=>{console.log('Error in BATCH PRODUCER')});
            //     console.log('Waiting Finished......................................................................');
            //     consumer.resume();
            // }, 3000);

        },
    })
    .catch(err=>{console.log(`Error in CONSUMER RUN`)});

};

listeningKafka().catch(err=>console.log('Error in LISTENING KAFKA'));

process.on("beforeExit",()=>{
    consumer.disconnect();
})