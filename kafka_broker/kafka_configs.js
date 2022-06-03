const kafka = require('./connection');
let admin = kafka.admin();

let kafka_configs = {
    create_topic: async function(req,res){
        admin.connect();
        let { name } = req.body
        let result = await admin.createTopics({
            topics:[{
                topic:`${name}`,
                numPartitions:7,
            }],
            validateOnly: false
        }).catch(err=>{console.log('create topic error',err)});
        console.log('Topic Created : ',result);
        res.send(result);
        admin.disconnect();
        return 1
    },
    all_topics: async function(req,res){
        admin.connect();
        let topics = await admin.listTopics().catch(err=>{console.log('get topic error',err.message)});
        console.log('Topics : ',topics);
        res.send(topics);
        admin.disconnect();
        return 1;

    }
}

module.exports = kafka_configs