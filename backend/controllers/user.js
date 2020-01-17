const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'user created!',
                result: result
            });
        }).catch(err => {
            // console.log(err);
            if (err.errors.email) {
                res.status(500).json({
                    message: 'Email already exists, please log in'
                }); 
            }
            res.status(500).json({
                error: err
            });
        });
    });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email }).then( user => {
        if (!user) {
            return res.status(401).json({
                message: "email does not exist!, Please sign up"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
             process.env.JWT_KEY , { expiresIn: "1h" });
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
}