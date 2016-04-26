// Application initialization and entry point

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db');
var routes = require('./controllers/index');

var app = express();

var port = process.env.PORT || 3000;

// setup body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// pass requests to routers
app.use('/', routes);

// connect to database and listen for client connections
db.connect(function (error) {
	if (error) throw error;
	app.listen(port);
});