"use strict"
module.exports = function (Model) {
  
    const manager = function (req, res, next) {
        if (req.session.userRole === 'manager') {
            Model.picker.find({},function(err,results){
                if(err){
                    return next();
                }else{
                    res.json(results)
                }
            })
        
        }
    

    }

    const login =  function(req, res, next){
        var users = {
          "Christian": "developer",
          "Fritz": "manager",
          "Clement":"picker"
        };
      
        var username = req.body.username;
      
        var userRole = users[username];
      
        if (userRole && req.body.password === 'steltixE1') {
          req.session.username = req.body.username;
          req.session.userRole = userRole;
      
          if (userRole === 'manager') {
            //Return response status

            res.json( req.session)

            //Redirect the routing to Manager VIEW
            
            
          }else if (userRole == 'picker') {
            //Return response status
             // res.json('success')
            res.json( req.session)
              

            //Redirect the routing to Pickwe View

            
          }else if (userRole == 'developer') {
            //Return response status
            res.json('success');

            //Redirect the routing to Pickwe View


          }
          
        }else{
            res.json('Please use your correct Username and password')
        }
      
        
      
      }

      const access_denied = function(req, res){
        res.json("access_denied");
    }

    // c+onst 

    return {
    login,
    access_denied,
    manager
    }

}