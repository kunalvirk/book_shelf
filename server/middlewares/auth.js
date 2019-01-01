const User = require('../models/user');

const auth = (req, res, next) => {
    let token = req.cookies.auth;
    User.findByToken(token, (err, user) => {
        if (err) next(err);
        if (!user) return res.status(401).send({
            error : true,
            message : "User not found"
        })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = auth;