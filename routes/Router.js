var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config');


"use strict"
module.exports = function (Model) {
    
 // console.log(config)
    const manager = function (req, res, next) {
       // if (req.session.userRole === 'manager') {
            Model.picker.find({},function(err,results){
                if(err){
                    return next();
                }else{
                    res.json(results)
                }
            })
        
       // }
    

    }

    const scanZone =  function(req, res, next){
       
        Model.user.findOne({username: req.body.username}, function (err, user) {
            if(err) return res.status(500).send('Error on the server.');
            if(!user) return res.status(404).send('No user found.');
    
            var passwordIsValid = bcrypt.compareSync(req.body.password,
            user.password);
            if(!passwordIsValid) return res.status(401).send({auth: false,
            token: null});
    
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 3600 //expires in 1 hour
            })
    
            res.status(200).send({auth: true, token: token, role: user.role})
            
        })    
             
      }
      const availItems = function (req, res, next) {
        Model.items.find({}, { _id: 0, __v: 0 }, function (err, results) {
            if (err) return next();
            res.json(results)
        })
    }

    const getPObyId = function (req, res, next) {
        var scannedPo = req.body.PO_number;
        var scannedItem = req.body.Item_no;
        Model.items.findOne({ PO_number: scannedPo }, { _id: 0, __v: 0 }, function (err, results) {
            if (err) throw err;
            var detailsArray = results.Details;
            var findings = [];
            detailsArray.forEach(element => {
                if (element.Item_no === scannedItem) {
                    findings.push(element)
                } 
            });
            res.json(findings)
        })
    }

    const register = function(req, res) {
  
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        Model.user.create({
          username : req.body.username,
          role : req.body.role,
          password : hashedPassword
        },
        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user.")
          // create a token
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        }); 
      }

      const access_denied = function(req, res){
        res.json("access_denied");
    }

    // c+onst 

    return {
    scanZone,
    availItems,
    getPObyId,
    access_denied,
    manager,
    register
    }

}