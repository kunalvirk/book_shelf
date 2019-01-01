const express = require('express');
const router = express.Router();

// Model
const Book = require('../models/book');

router.get('/getBook', (req, res) => {
    let id = req.query.id;
    Book.findById(id, (err, doc) => {
        if (err) {
            return res.status(500).json({
                message : "This book doesn't exist",
                Error : err
            })
        }
        res.status(200).json(doc)
    })
})

router.get('/books', (req, res) => {

    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).limit(limit).sort({_id:order}).exec((err, doc) => {
        if (err) {
            return res.status(500).json({
                message : "This book doesn't exist",
                Error : err
            })
        }
        res.status(200).json(doc)
    })
})

router.post('/book', (req,res) => {
    const book = new Book(req.body);
    book.save((err,doc) => {
        if (err) {
            return res.status(500).json({
                Error : err
            })
        }
        res.status(201).json({
            post : true,
            bookId : doc._id
        })
    })
})

router.get('/book/byUser', (req, res) => {
    Book.find({ownerId:req.query.user}).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.send(docs)
    })
})

router.post('/book_update/:bookId', (req,res) => {
    let id = req.params.bookId;
    Book.findByIdAndUpdate(id, req.body, {new :true}, (err, doc) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({
            success : true,
            details : doc
        })
    })
})


router.delete('/book_delete/:bookId', (req,res) => {
    let id = req.params.bookId;
    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({
            success : true,
            details : doc
        })
    })
})

module.exports = router;