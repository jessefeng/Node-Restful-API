const express = require('express');
const workExpModel = require('../models/workingExprience');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/work', (req,res,next) => {
    workExpModel.find()
        .exec()
        .then((docs)=> {
            res.status(200).json(docs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.post('/work', (req,res,next) => {
    const workExprience = new workExpModel({
        _id:new mongoose.Types.ObjectId(),
          companyName: req.body.companyName,
          period: req.body.period
    });
    workExprience
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /work',
                createWorkExprience: workExprience
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.get('/work/:workExpID', (req,res,next) => {
    const workExpID = req.params.workExpID;
    workExpModel.findById(workExpID)
        .exec()
        .then((doc)=> {
            doc ? res.status(200).json(doc) : res.status(200).json({message: 'empty result'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/work/:workExpID', (req,res,next) => {
    const workExpID = req.params.workExpID;
    workExpModel.update({_id:workExpID}, {$set: {...req.body}})
        .exec()
        .then((result)=> {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.delete('/work/:workExpID', (req,res,next) => {
    const workExpID = req.params.workExpID;
    workExpModel.remove({_id:workExpID})
        .exec()
        .then((result)=> {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports = router;