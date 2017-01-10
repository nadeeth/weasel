var express = require('express');
var md5 = require('md5');
var User   = require('../models/user');
var router = express.Router();

//Create a new instance of the model and persist it into the data source
router.post('/', function(req, res, next) {

    if (req.decodedToken.role == 'admin') {//Permision checks etc

        // create the user
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password),
            date_of_birth: req.body.date_of_birth,
            role: req.body.role,
            loc: req.body.loc
        });

        // save the user
        user.save(function(err) {
            if (err) throw err;
            user.password = null;
            res.json({ success: true, data: user });
        });
    } else {
        res.json({ success: false, data: 'Not permitted' });
    }
});

//Update instances of the model matched by filter
router.post('/update', function(req, res, next) {

});

//Find all instances of the model matched by filter
router.get('/', function(req, res, next) {

});

//Find a modle instance by id
router.get('/:id', function(req, res, next) {

});

//Check whether a modle instance exists
router.get('/:id/exists', function(req, res, next) {

});

//Count the model instances matched by filter
router.get('/count', function(req, res, next) {

});

//Find the first instance of the model matched by filter
router.get('/findOne', function(req, res, next) {

});

//Update an existing model
router.put('/', function(req, res, next) {

});

//Update the attributes of an existing model by id
router.put('/:id', function(req, res, next) {

});

//Check whether a model instance exists
router.head('/:id', function(req, res, next) {

});

//Delete a modle instance by id
router.delete('/:id', function(req, res, next) {

});

module.exports = router;


//router.get('/:action*?', function(req, res, next) {
