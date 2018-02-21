"use strict"
module.exports = function (Model) {

    const manager = function (req, res, next) {
        Model.picker.find({},{_id:0,__v:0}, function (err, results) {
            if (err) return next();
            res.json(results)
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

    // const updateItems = function(req, res, next){
    //     var scannedPo = req.body.PO_number;
    //     var scannedItem = req.body.Item_no;
    //     Model.items.update({PO_number:scannedPo})
    // }

    return {
        manager,
        availItems,
        getPObyId
    }

}