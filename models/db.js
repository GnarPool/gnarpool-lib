var mongoose = require('mongoose');
var mongoURL = "mongodb://gnarpool:shr3dTheGnar@ds021671.mlab.com:21671/gnarpool-db";

exports.connect = function (callback) {
	mongoose.connect(mongoURL);
	var db = mongoose.connection;
	db.on('error', function (error) { callback(error) });
	db.on('open', function () { callback() });
}