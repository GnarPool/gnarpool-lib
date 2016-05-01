var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	fname: String,
	lname: String,
	email: String,
	password: String
});

// expose the model to the app
module.exports = mongoose.model('User', userSchema);