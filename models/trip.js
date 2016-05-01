var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// require the user schema for embedding
var userSchema = require('./user.js').schema;

var tripModel = new Schema({
	driver: userSchema,
	passengers: [userSchema],
	origin: String, // what about the case where passengers get on at different locations?
	destination: String
});

// expose the model to the app
module.exports = mongoose.model('Trip', tripModel);