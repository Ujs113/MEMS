const express = require('express');
const cors = require('cors');
const http = require('http');
const Socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = Socket(server, {
  cors: {
    origin: '*',
    optionsSuccessStatus: 200
  }
});
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

//websocket
io.on('connection', async (ws) => {
  console.log('Websocket connected');
  Participant.watch({fullDocument: 'updateLookup'}).on('change', (data) => {
    ws.emit('message',data);
  });
})

//routes
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);
app.use('/songs', songRoutes);


app.listen(8080)
server.listen(8000);