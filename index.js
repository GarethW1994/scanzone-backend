// require npm modules
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');


//define mongo url
const mongoURL = process.env.MONGO_DB_URL ||'mongodb://localhost/backend-log';

// REQUIRE OTHER FILES HERE
const model = require('./modules/Modules');

// INITILIASE
const Model = model(mongoURL)


// intialise dependencies
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// handle CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Accept', 'application/json');
  next();
});

app.use(cors());

// Get Route to get home
app.get('/', function(req, res, next) {
    res.send('SCAN ZONE EXPRESS BACKEND')
});

// OTHER ROUTES GO HERE

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next();
});

// PORT
const port = 3001;

app.listen(port, function(){
    console.log("Express App Running at port " + port);
});
