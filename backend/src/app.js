const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
const Participant = require('../models/Participant');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));

//connect to db
mongoose.connect(process.env.CONNECTION_STRING, () => console.log('connected to db'));

//routes

app.post('/participant', async (req, res) => {
    const participant = new Participant({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        mobileno: req.body.mobileno
    });

    try{
        const savedPart = await participant.save();
        res.status(200).send(savedPart);
    }catch(err){
        res.status(400).json({
            message: err
        });
    }
})

app.get('/participant', async(req, res) => {
    try{
        const participants = await Participant.find();
        res.status(200).send(participants);
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
})

app.listen(8080);