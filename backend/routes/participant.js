const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const Participant = require('../models/Participant');

router.post('/', async (req, res) => {
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

router.get('/', async(req, res) => {
    try{
        const participants = await Participant.find();
        res.status(200).send(participants);
    }catch(err){
        res.status(400).json({
            message: err
        })
    }
})

router.get('/:mobileno', async(req, res) => {
    var query = Participant.find({mobileno: Number(req.params.mobileno)});
    query.getFilter();
    query.exec().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(400).send(err);
    })
})


module.exports = router;