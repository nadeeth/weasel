var express = require('express');
var User   = require('../models/user');
var router = express.Router();

router.get('/:action*?', function(req, res, next) {

    if (req.params.action === '') {
        res.json({
            success: 'false'
        });
    }
});

module.exports = router;
