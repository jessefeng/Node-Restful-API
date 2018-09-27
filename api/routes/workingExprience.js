const express = require('express');
const router = express.Router();

router.get('/work', (req,res,next) => {
    res.status(200).json({
        message: 'working exprience GET request'
    });
});

router.post('/work', (req,res,next) => {
    const workExprience = {
      companyName: req.body.companyName,
      period: req.body.period
    };
    res.status(201).json({
        message: 'working exprience POST request',
        createWorkExprience: workExprience
    });
});

router.get('/work/:skillID', (req,res,next) => {
    const skillID = req.params.skillID;
    if(skillID === 'javascript'){
        res.status(200).json({
            message: `working skill with master language ${skillID}`
        });
    }else {
        res.status(200).json({
            message:  'working skill others'
        });
    }
});

router.patch('/work/:skillID', (req,res,next) => {
    res.status(200).json({
        message: 'patch work skill'
    });
});

router.delete('/work/:skillID', (req,res,next) => {
    res.status(200).json({
        message: 'delete work skill'
    });
});

module.exports = router;