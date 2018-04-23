const timeSpend = function(req, res, next) {
  Model.picker.find({}, {
    _id: 0,
    __v: 0
  }, function(err, results) {
    if (err) {
      return next();
    } else {
      var timePeruser = results
      var userTimes = [];
      for (var i = 0; i < timePeruser.length; i++) {
        var currentUser = timePeruser[i].Picker_Username,
          task = timePeruser[i].Task_Done,
          userLogin = timePeruser[i].Log.Login_Time,
          userLogout = timePeruser[i].Log.Logout_Time,
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

module.exports = timeSpend;
