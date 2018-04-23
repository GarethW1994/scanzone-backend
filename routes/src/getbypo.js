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
    })


  }

  module.exports = getPObyId;