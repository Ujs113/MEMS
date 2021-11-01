const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
const eventRoutes = require('./routes/event.js');
const participantRoutes = require('./routes/participant.js');
const songRoutes = require('./routes/songs');



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//connect to db
mongoose.connect(process.env.CONNECTION_STRING, () => console.log('connected to db'));

//routes
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);
app.use('/songs', songRoutes);


app.listen(8080);