const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    review : {
        type : String,
        default : 'N/A'
    },
    pages : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    price : {
        type : String,
        default : 'N/A'
    },
    ownerId : {
        type : String,
        required : true
    }
}, { timestamps: { createdAt: 'createdDate',updatedAt: 'updatedDate' } });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;