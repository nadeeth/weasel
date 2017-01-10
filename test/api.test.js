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

    //User 
    it('POST: User --> Create User', function(done) {
        
        login({ email: 'john.doe@gmail.com', password: 'john' },function(err, res) {

            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.equal(true, result.success);
            assert(result.token);

            superagent.post('http://localhost:3000/user').send({
                name: 'Jane Doe',
                email: 'Jane.doe@gmail.com',
                password: 'Jane',
                date_of_birth: '1980-12-14',
                role: 'user',
                loc:[ 174.76333150000005,-36.8484597 ]
            }).set('x-access-token', result.token).end(function(err, res) {
                
                assert.ifError(err);
                assert.equal(res.status, status.OK);
                var result = JSON.parse(res.text);
                assert.equal(true, result.success);
                assert(result.data);
                assert.equal('Jane Doe', result.data.name);
                assert.equal('Jane.doe@gmail.com', result.data.email);
                assert.equal(null, result.data.password);
                assert.equal('1980-12-14T00:00:00.000Z', result.data.date_of_birth);
                assert.equal('user', result.data.role);
                assert.equal(174.76333150000005, result.data.loc[0]);
                assert.equal(-36.8484597, result.data.loc[1]);
                done();
            });

        });
    });
    //End of User
});
