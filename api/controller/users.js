const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


exports.user_signup = (req, res, next) => {
    User.find({email : req.body.email})
        .exec()
        .then(user => {
            if(user.length >= 1){
                res.status(409).json({
                    message: 'Email Already existed'
                })
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    }else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then((result) => {
                                res.status(201).json({
                                    message: 'User Created'
                                })
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.user_login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .exec()
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth Failed'
                    })
                }
                if(result){
                    const token = jwt.sign({
                            email:user.email,
                            userId:user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token_jwt: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth Failed',
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.user_delete = (req,res,next) => {
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'user deleted'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

