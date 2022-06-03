const { default: axios } = require("axios");
const kafka = require('../kafka_broker/connection');
let count = 0;

const producer = kafka.producer();

let event_generation = {
    generate_events : async function (req,res){
        
        if(req){
            let {messages} = req.body;
            // let headers = req.headers;
            // message.messages += headers.time;
            messages += count++;

            let response = await event_generation.kafka_producer(messages)
            .catch(err=>{console.log('err in generate events kafka',err.message)});

            console.log('finsihed response and count is : ', count);
            
            res.end(`Success! : ${count}`);

            return 1;
        }else{
            // list of randome events
            let events_array = [
                "ORDER_PLACED",
                "SELLER_CONFIRMATION",
                "PICKUP_SCHEDULED",
                "PICKUP_IN_TRANSIT",
                "SHIPPED",
                "DELIVERED"
            ]
            
            let randomIndex = Math.floor(Math.random()*events_array.length)
    
            // from list of array fetch an event
            let finalStatus = events_array[randomIndex];
            console.log(finalStatus);
    
            // make axios call
            let response = await event_generation.sent_locally(finalStatus).catch(err=>{console.log('err in generate evenets ')});
            return 1;
        }
        
    },
    sent_locally: async function(finalStatus){
        console.log('called api')
        let response = await axios.post(`${config["host:events"]}`,{message:finalStatus}).catch(err=>{console.log('Err in axios')});
        console.log('Response : ',response.data);
        return response.data;
    },
    kafka_producer: async function(finalStatus){
  
        // const producer = kafka.producer();
        await producer.connect();

        await producer.send({
          topic: 'POC_messages',
          messages: [{value:JSON.stringify(finalStatus)}],
          timeout:30000,
        }).catch(err=>{console.log('Error in kafka producer')});
        console.log('POC producer completed')
        // await producer.disconnect();
        return 1
      }
      
    
}
module.exports = event_generation;

// setInterval(async () => {
//     await event_generation.generate_events();
// }, 3000);