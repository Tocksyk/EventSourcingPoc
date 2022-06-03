const event_generation = require("./events/generate_events");
const kafka_configs = require("./kafka_broker/kafka_configs");


module.exports = function(app){
    
    app.route('/events').post((req,res)=>{
        console.log('RECIEVED :',req.body);
        res.send({"CURRENT_STATUS":req.body});
    });

    // TESTING - PASSED
    app.route('/createTopic').post(kafka_configs.create_topic)
    app.route('/getAllTopic').post(kafka_configs.all_topics)

    // TESTING - 
    app.route('/producer').post(event_generation.generate_events)

}
