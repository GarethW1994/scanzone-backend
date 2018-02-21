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

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('./config');


//define mongo url
const mongoURL = process.env.MONGO_DB_URL ||'mongodb://localhost/backend-log';

// REQUIRE OTHER FILES HERE
const model = require('./modules/Modules');
const routes = require('./routes/Router');

// INITILIASE
const Model = model(mongoURL)
const Routes = routes(Model);


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

//User sessions to track Logins
app.use(session({
  secret: '@pp Factori3',
  resave: false,
  saveUninitialized: true
}))


app.use(cors());

// Get Route to get home
app.get('/', function(req, res, next) {
    res.send('SCAN ZONE EXPRESS BACKEND')
});
app.get('/items',Routes.availItems);
app.post('/po',Routes.getPObyId)
// OTHER ROUTES GO HERE
app.get('/manager',Routes.manager);
app.get('/items',Routes.availItems);
app.post('/po',Routes.getPObyId)
// app.post('/create',Routes.creatData)
app.get('/access_denied', Routes.access_denied);

//Post Route to login
app.post('/scanZone', Routes.scanZone);

app.post('/register', Routes.register);

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
