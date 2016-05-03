var bcrypt = require('bcryptjs');

//hash a password
exports.encrypt = function (password, callback) {
	bcrypt.genSalt(10, function (error, salt) {
		if (err) return callback(error);
		bcrypt.hash(password, salt, function (error, hash) {
			callback(error, hash);
		});
	});
}

//compare a user-supplied password with a hashed password
exports.compare = function (userPassword, password, callback) {
	bcrypt.compare(userPassword, password, function (error, same) {
		callback(error, same);
	});
}