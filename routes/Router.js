"use strict"
module.exports = function (Model) {

    const manager = function (req, res, next) {
        Model.picker.find({},function(err,results){
            if(err){
                return next();
            }else{
                res.json(results)
            }
        })
    }

    // c+onst 

    return {
    manager
    }

}