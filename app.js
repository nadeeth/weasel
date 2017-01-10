var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSanitized = require('express-sanitized');

var config = require('./config'); // get the config file
var utils = require('./utils'); // Utility functions

module.exports = function(config) {
    
    var app = express();

    mongoose.connect(config.database); // connect to database

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //Cross Origin Requests
    if (config.allowCrossDomain) {
        app.use(utils.allowCrossDomain);
    }

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressSanitized());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //Validate access token
    app.use(utils.verifyToken);

    //Routes (Controllers)
    app.use('/', require('./routes/index'));
    app.use('/user', require('./routes/user'));
    app.use('/setup', require('./routes/setup'));
    app.use('/authenticate', require('./routes/authenticate'));
    
    
    //404 
    app.get('/404', function(req, res){
        throw new NotFound;
    });
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    return app;
};
