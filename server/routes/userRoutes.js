const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT = 10;


// Model
const User = require('../models/user');
const Book = require('../models/book');

// Middlewares
const auth = require('../middlewares/auth');

router.post('/user/signup', (req, res) => {

    bcrypt.genSalt(SALT, (err, salt) => {
        if (err) return res.send(500).send({Error : err});
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(500).send({Error : err});
            const createUser = new User({
                email : req.body.email,
                password: hash,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                role : req.body.role,
                token : req.body.token
            });
            createUser
                .save()
                .then(doc => {
                res.status(201).send({
                        message : "User Created",
                        success : true,
                        userDetails : doc
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message : "There was an error creating this user",
                        Error : err
                    })
                })

        })
    })

})

router.post("/user/login", (req, res) => {
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
});

router.get('/getReviewer', (req,res) => {
    let id = req.query.id;
    User.findById({'_id' : id}, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send({
            message : "Fetching",
            firstname : doc.firstname,
            lastname : doc.lastname
        })
    })
})

router.get('/user/books', (req,res) => {
    Book.find({'ownerId' : req.query.id}, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).send({
            doc
        })
    })
})

router.get('/user/logout', auth, (req, res) => {
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

router.get('/user/auth', auth, (req, res) => {
    res.status(200).send({
        isAuth : true,
        id:req.user._id,
        firstname : req.user.firstname,
        lastname : req.user.lastname,
        email : req.user.email
    })
})

router.get('/users', (req, res) => {
    User.find({}, (err, doc) => {
        if (err) return res.status(500).send({message : "Can't access route", error : err})
        res.status(200).send(doc)
    })
})

module.exports = router;