const express = require("express");
const fs = require("fs");
const model = require('../modules/Modules');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/backend-log';
const models = model(mongoURL);

const defualt_itemObject = function () {


    fs.readFile('./item_data.json', 'utf8', function (err, data) {
        if (err) throw err;
        // console.log('Connecting to mongo Url.....')
        var itemsObj = JSON.parse(data);
        models.items.create(
            itemsObj.itemslist
            , function (err, results) {
                console.log('Loading data.......')
                if (err) throw err;
                console.log('Adding data to mongodb.......')
                console.log(results)
                console.log('Data added successfully')
            })
    });
}(async function () { });