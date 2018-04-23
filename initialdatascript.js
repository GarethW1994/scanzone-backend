const express = require("express");
const model = require('./modules/Modules');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/backend-log';
const Model = model(mongoURL)

var defaultD = {
    PO: '1811',
    SupplierNo: '125S',
    totalAmount: 50,
    Details: [{
        ItemNo: 4749,
        Cost: 450,
        Qty: 5,
        Status: false
    }, {
        ItemNo: 1002,
        Cost: 150,
        Qty: 4,
        Status: true
    }, {
        ItemNo: 1003,
        Cost: 1521,
        Qty: 3,
        Status: true
    }]
}

const defualt_config = function() {
    // console.log(Model.PurchaseOrder)
   // Model.PurchaseOrder.remove({}).then(function() {
        Model.PurchaseOrder.create({ PO: defaultD.PO, SupplierNo: defaultD.SupplierNo, totalAmount: defaultD.totalAmount, Details: defaultD.Details }, function(err, response) {
            if (err) throw err;

            console.log(response)
        })
    //})
}(async function() {});
