var express = require('express');
var User   = require('../models/user');
var router = express.Router();

/* GET create test data. */
router.get('/', function(req, res, next) {

    // create a sample user
    var user = new User({
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        password: 'enduro',
        date_of_birth: '1983-12-14',
        loc:[ 174.76333150000005,-36.8484597 ]
    });

    // save the sample user
    user.save(function(err) {
        if (err) throw err;
        res.json({ success: true, data: user });
    });
});

module.exports = router;