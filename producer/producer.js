exports.producer_list = {
    generic_producer: async function(topic_name,kafka_connection, messages){
        let producer = kafka_connection.producer();
        await producer.connect();
        await producer.send({
            topic:topic_name,
            messages:{value:messages}
        });
        console.log(`Message is sent ...`);
        await producer.disconnect();
        return 1
    },
    batch_producer: async function(batch,producer){
        // let producer = kafka_connection.producer();
        await producer.connect();
        await producer.sendBatch({topicMessages:batch,timeout:30000})
        .then(data=>{console.log(`BATCH IS PROCESSING FOR BI CONSUMER`)})
        .catch(err=>{console.log(`error in batching`)});
        // await producer.disconnect();
        return 1
    }
}