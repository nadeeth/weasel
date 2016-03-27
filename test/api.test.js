var assert = require('assert');
var superagent = require('superagent');
var http = require('http');
var mongoose = require('mongoose');
var status = require('http-status');
var config = require('../test/config');
var server = require('../app')(config);

/* Drop the Test DB */
mongoose.connection.on('open', function(){
    mongoose.connection.db.dropDatabase(function(err){
        //Create Default Data
    });
});

//Login
var login = function(user, callback) {
    superagent.post('http://localhost:3000/authenticate').send(user).end(callback);
};
 
describe('/setup', function() {

    var app;

    before(function() {

        server.set('port', config.port);
        app = http.createServer(server);
        app.listen(config.port);

    });

    after(function() {
        app.close();
    });

    //Setup
    it('POST: Setup should create the test account.', function(done) {

        superagent
            .post('http://localhost:3000/setup')
            .end(function(err, res) {

                assert.ifError(err);
                assert.equal(res.status, status.OK);
                var result = JSON.parse(res.text);
                assert.equal(true, result.success);
                assert.equal('john.doe@gmail.com', result.user.email);
                assert.equal('John Doe', result.user.name);

                done();

        });
    });
    //End of Setup

    //Authenticate
    it('POST: Authenticate --> Should return a JWT for valid users', function(done) {
        
        login({ email: 'john.doe@gmail.com', password: 'john' },function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.equal(true, result.success);
            assert(result.token);
            done();
        });
    });
    
    it('POST: Authenticate --> Wrong password', function(done) {
        
        login({ email: 'john.doe@gmail.com', password: 'wrong password' }, function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            assert.deepEqual({ success: false, message: 'Wrong password.' }, JSON.parse(res.text));
            done();
        });
    });
    
    it('POST: Authenticate --> Wrong user', function(done) {
        
        login({ email: 'wrong@email.user', password: 'wrong password' }, function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            assert.deepEqual({ success: false, message: 'User not found.' }, JSON.parse(res.text));
            done();
        });
    });
    //End of Authenticate
});