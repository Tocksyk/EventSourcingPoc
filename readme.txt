Open FIVE terminals

Terminal 1:
Start kafka by following command:
> npm run kafka:start

Terminal 2:
Start Server for our Architecture:
> npm start


Terminal 3:
Start Event listener service OR initial consumer which listens on POCmessages topic:
> npm run consumer:poc

Terminal 4:
Start Bi consumer which listens on topics - topic1, topice2, topic3:
> npm run consumer:bi

Terminal 5:
Start the AB testing:
> npm run ab_testing


Working:
AB testing will hit the route http://localhost:3000/produce which in turn produce a message
in the topic called "POSmessages".

Initial consumer will be listening to the topic POCmessages and as soon as the data is
recieved the initial consumer will do some computation and produce the new message in the
topic - topic1, topice2, topic3 and these topics are listened by the BI consumers.