"use strict"

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config');

module.exports = function(Model) {

  // console.log(config)
  const manager = function(req, res, next) {
    //    console.log(req.headers.authorization)
    //    if (req.session.verifyToken) {
    Model.picker.find({}, {
        _id: 0,
        __v: 0
      }, function(err, results) {
        if (err) {
          return next();
        } else {
          res.json(results)
          res.end();
          // console.log(results)
        }
      })
      // next();
      //    }else{
      //     return res.status(404).send('Access denied')
      //  }
  }

  const timeSpend = function(req, res, next) {
    Model.user.find({}, {
      _id: 0,
      __v: 0
    }, function(err, results) {
      if (err) {
        return next();
      } else {
        var timePeruser = results
        var userTimes = [];
        for (var i = 0; i < timePeruser.length; i++) {
          var currentUser = timePeruser[i].username,
            task = timePeruser[i].Task_Done,
            userLogin = timePeruser[i].log.loginTime,
            userLogout = timePeruser[i].log.logOutTime,
            timeIn = new Date(userLogin),
            timeOut = new Date(userLogout),
            diff = timeOut.getTime() - timeIn.getTime(),
            msec = diff,
            hh = Math.floor(msec / 1000 / 60 / 60);
          msec -= hh * 1000 * 60 * 60;
          var mm = Math.floor(msec / 1000 / 60);
          msec -= mm * 1000 * 60;
          var ss = Math.floor(msec / 1000);
          msec -= ss * 1000;
          var timeDif = +hh + ":" + mm + "," + ss;
          userTimes.push({
            "name": currentUser,
            "items": [diff]
          });
          // console.log(currentUser, userLogs);
        }
        // console.log(userTimes);
        res.json(userTimes)
        res.end();
        // console.log(results)
      }
    })
  }


  var cUser, login, task = [];
  const scanZone = function(req, res, next) {
    cUser = req.body.username;
    Model.user.findOne({
      username: cUser
    }, function(err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      
      //If user is found get login time, save on the DB
     
      //Keep track of the user's activities, triggered functionalities of the App
      //Save all of the activties on the DB as Soon the user LogOut of the App.
      //Store LogOut time on the DB.
      
      var passwordIsValid = bcrypt.compareSync(req.body.password,
        user.password);
      if (!passwordIsValid) return res.status(401).send({
        auth: false,
        token: null
      });

      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 3600 //expires in 1 hour
      })
      res.status(200).send({
        auth: true,
        token: token,
        role: user.role,
        username: user.username
      })
      req.headers.token = token;
      // console.log(res.status(200))
      // login = new Date;
      // console.log(login)
      
	//Save login Time 
    }).then(function(){
      login = new Date;
      task = [];
      // record.log.push({loginTime: new Date});
      // record.save();
    })

  }

  const logOff = function(req, res,next){
    if(req.session){
      //delete session object
      req.session.destroy(function(err){
        if(err){
          return next(err);
        }else{
          Model.user.findOne({
            username: cUser
          }, function(err, record) {
            // console.log(record)
            // record.update({"username": cUser}, {"$set" : {"log" : [{"logOutTime": new Date}]}})
            record.log.push({
              loginTime: login,   
              task: task,           
              logOutTime: new Date
            });
            record.save();                 
      
          });
          return res.redirect('/');
        }
      });
    }
  }
  const availItems = function(req, res, next) {

    Model.items.find({}, {
      _id: 0,
      __v: 0
    }, function(err, results) {
      if (err) return next();
      res.json(results);
      res.end();
    })


  }

  const getPObyId = function(req, res, next) {

    var scannedPo = req.body.PO_number;
    var scannedItem = req.body.Item_no;
    Model.items.findOne({
      PO_number: scannedPo
    }, {
      _id: 0,
      __v: 0
    }, function(err, results) {
      if (err) throw err;
      var detailsArray = results.Details;
      var findings = [];
      detailsArray.forEach(element => {
        if (element.Item_no === scannedItem) {
          findings.push(element)
        }
      });
      res.json(findings);
      res.end();
    }).then(function(){
      task.push("Purchase Order")

    })


  }

  const register = function(req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    Model.user.create({
        username: req.body.username,
        role: req.body.role,
        password: hashedPassword
      },
      function(err, user) {
        if (err) return res.status(500).send(
            "There was a problem registering the user.")
          // create a token
        var token = jwt.sign({
          id: user._id
        }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
          auth: true,
          token: token
        });
      });
  }

const updateItem = function(req, res, next) {
        const PO = req.params.PO;
        const itemToUpdate = req.body;

        console.log(PO, itemToUpdate);

        Model.PurchaseOrder.findOne({ PO: PO }, function(err, callback) {
                if (err) throw err;
            })
            .then(function(callback) {
                let item = new Promise(function(resolve, reject) {
                    function searchItem(element, index, array) {
                        if (element.ItemNo == itemToUpdate.ItemNo) {
                            resolve(callback.Details[index] = itemToUpdate);
                        }
                    }
                    callback.Details.forEach(searchItem);
                })

                item.then(item => {
                    if (item) {
                        console.log(item)
                        Model.PurchaseOrder.update(callback, function(err, cb) {
                            if (err) throw err;
                            res.status(200).json({ cb, message: 'success' });
                        })
                    }
                }).then(function(){
                  task.push("Updating Item: ")
                })
            })
            
    }


 const po = function(req, res, next) {
        Model.PurchaseOrder.find({}, function(err, purchases) {
                if (err) throw err;
            })
            .then(function(purchases) {
                res.json(purchases);
            })
    }  

const access_denied = function(req, res) {
    res.json("access_denied");
  }


  // const updateItems = function(req, res, next){
  //     var scannedPo = req.body.PO_number;
  //     var scannedItem = req.body.Item_no;
  //     Model.items.update({PO_number:scannedPo})
  // }

  return {
    scanZone,
    logOff,
    availItems,
    getPObyId,
    access_denied,
    manager,
    register,
    timeSpend,
    updateItem,
po
  }

}

// var routes = {
//   scanZone : require('./src/scanzone'),
//   availItems : require('./src/availitems'),
//   getPObyId : require('./src/getbypo'),
//   access_denied : require('./src/access_denied'),
//   manager : require('./src/manager'),
//   register : require('./src/register'),
//   timeSpend : require('./src/timespend')
// }

// module.exports = routes;
