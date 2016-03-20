var express = require('express');
var User   = require('../models/user'); // get user mongoose model
var jwt = require('jsonwebtoken'); 
var config = require('../config');
var router = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) { 

            // check if password matches
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            } 
        }

    });
});

module.exports = router;