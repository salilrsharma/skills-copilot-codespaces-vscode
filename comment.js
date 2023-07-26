// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbconfig = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var mime = require('mime');
var cors = require('cors');

// configuration ===========================================

// set the port
var port = process.env.PORT || 8080;

app.use(cors());

// connect to mysql database
connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

// set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the static files location
app.use(express.static(__dirname + '/public'));

// set the routes ===========================================
var router = require('./routes')(app, connection, multer, fs, path, crypto, mime);

// start app ===============================================
app.listen(port);
console.log('Server started on port ' + port);
