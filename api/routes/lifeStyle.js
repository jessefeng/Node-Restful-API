const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status('200').json({
        message: 'life lists fetched'
    });
});

router.post('/', (req,res,next) => {
    res.status('201').json({
        message: 'life lists created'
    });
});

router.get('/:momentsID', (req,res,next) => {
    res.status('200').json({
        message: 'moments details',
        momentsID: req.params.momentsID
    });
});

router.delete('/:momentsID', (req,res,next) => {
    res.status('200').json({
        message: 'moments delete',
        momentsID: req.params.momentsID
    });
});

module.exports = router;