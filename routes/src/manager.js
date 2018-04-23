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

module.exports = manager;
