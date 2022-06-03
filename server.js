
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const body_parser = require('body-parser');

global.config = require('./config.json');

let route = require('./routes');

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})

route(app);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


