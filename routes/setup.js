var express = require('express');
var md5 = require('md5');
var User   = require('../models/user');
var router = express.Router();

/* GET create test data. */
router.post('/', function(req, res, next) {

    // create a sample user
    var user = new User({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: md5('john'),
        date_of_birth: '1983-12-14',
        loc:[ 174.76333150000005,-36.8484597 ]
    });

    // save the sample user
    user.save(function(err) {
        if (err) throw err;
        res.json({ success: true, user: user });
    });
});

module.exports = router;