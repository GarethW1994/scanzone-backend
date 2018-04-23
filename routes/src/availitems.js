const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/backend-log';
const model = require('../../modules/Modules');
const Model = model(mongoURL);

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

module.exports = availItems;
