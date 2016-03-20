// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
	name: { index: true, type: String, required: true },
	email: { index: true, type: String, required: true },
	password: { type: String, required: true },
	date_of_birth: Date,
	loc:{ type: [Number], index: '2dsphere' }
}));