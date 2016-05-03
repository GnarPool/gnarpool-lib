// Application initialization and entry point

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var GoogleStrategy = require('passport-google-oauth');

var db = require('./models/db');
var user = require('./models/user');
var routes = require('./controllers/index');

var app = express();

var port = process.env.PORT || 3000;

// setup body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// pass requests to routers
app.use('/', routes);

// passport local configuration
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	function (email, password, done) {
		user.findOne({ email: email }, function (err, user) {
			if (err) { return done(err) };
		
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			user.verifyPassword(function (error, isMatch) {
				if (err) { return done(error) }
			
				if (!isMatch) { return done(null, false) }

				return done(null, user);
			});
		});
	}
));

// passport google configuration

// passport facebook configuration

// connect to database and listen for client connections
db.connect(function (error) {
	if (error) throw error;
	app.listen(port);
});