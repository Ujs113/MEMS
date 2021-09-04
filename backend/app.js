const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
const participantRoutes = require('./routes/participant.js');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));

//connect to db
mongoose.connect(process.env.CONNECTION_STRING, () => console.log('connected to db'));

//routes
app.use('/participant', participantRoutes);



app.listen(8080);