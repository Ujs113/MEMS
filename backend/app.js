const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');
const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
const eventRoutes = require('./routes/event.js');
const participantRoutes = require('./routes/participant.js');
const songRoutes = require('./routes/songs');
const Participant = require('./models/Participant.js');


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//connect to db
mongoose.connect(process.env.CONNECTION_STRING, () => console.log('connected to db'));

//server.on('request', app);

//websocket
// wss.on('connection', async (ws) => {
//   var data = await Participant.find();
//   ws.send(JSON.stringify(data));
//   Participant.watch({fullDocument: 'updateLookup'}).on('change', (data) => {
//     ws.send(JSON.stringify(data));
//     console.log(data);
//   });
// })

//routes
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);
app.use('/songs', songRoutes);


app.listen(8080);