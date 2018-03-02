const express = require("express");
const fs = require("fs");
const model = require('../modules/Modules');

const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/backend-log';
const models = model(mongoURL);

const defualt_itemObject = function () {


    fs.readFile('./picker1.json', 'utf8', function (err, data) {
        if (err) throw err;
        // console.log('Connecting to mongo Url.....')
        var pickersObj = JSON.parse(data);
        console.log(pickersObj.pickerslist)
        models.picker.create(
            pickersObj.pickerslist
            , function (err, results) {
                console.log('Loading data.......')
                if (err) throw err;
                console.log('Adding data to mongodb.......')
                console.log(results)
                console.log('Data added successfully')
            })
    });
}(async function () { });