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

// OTHER ROUTES GO HERE
app.get('/manager',Routes.manager);

//Post Route to login
app.post('/login', function(req, res, next){
  var users = {
    "developer": "developer",
    "manager": "manager",
    "picker":"picker"
  };

  var username = req.body.username;

  var userRole = users[username];

  if (userRole && req.body.password === 'steltixE1') {
    req.session.username = req.body.username;
    req.session.userRole = userRole;

    if (userRole == 'manager') {
      //Redirect the routing to Manager VIEW
      res.redirect('managerView' + username)
      
    }else if (userRole == 'picker') {
      //Redirect the routing to Pickwe View
      res.redirect('pickerView' + username)
      
    }else if (userRole == 'developer') {
            //Redirect the routing to Pickwe View
            res.redirect('manager')
    }
    
  }

  

});

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
