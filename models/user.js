var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('../helpers/crypto');

var userSchema = new Schema({
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

// method to verify a hashed password
userSchema.methods.verifyPassword = function (password, callback) {
	crypto.compare(password, this.password, function (error, isMatch) {
		if (error) callback(error);
		callback(null, isMatch);
	});
};

// hash user password before saving
userSchema.pre('save', function (callback) {
	var user = this;
	
	// only continue if password is modified
	if (!user.isModified('password')) return callback();

	crypto.encrypt(user.password, function (error, hash) {
		if (error) return callback(error);
		user.password = hash;
		callback();
	});
});

// expose the model to the app
module.exports = mongoose.model('User', userSchema);