const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    firstname : {
        type : String,
        maxLength : 100
    },
    lastname : {
        type : String,
        maxLength : 100
    },
    role : {
        type : Number,
        default : 0
    },
    token : {
        type: String
    }
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = (token, cb) => {
    let user = this;
    jwt.verify(token, config.SECRET, (err, decode) => {
        User.findOne({"_id" : decode, "token":token}, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

userSchema.methods.deleteToken = function(token,cb){
    var user = this;

    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;