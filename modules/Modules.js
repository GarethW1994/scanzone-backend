const mongoose = require('mongoose');
const assert = require('assert');

module.exports = function (url) {
    // Use connect method to connect to the server
    mongoose.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to mongodb server");

        // db.close();
    });

    // Use native promises
    mongoose.Promise = global.Promise;

    // Floor Manager Schema
    const Admin = new mongoose.Schema({
        Admin_Username: {
            type: String
        },
        Admin_Password: {
            type: String
        }
    })

    // Set Unique Values For Admin Account
    Admin.index({ Admin_Username: 1 }, { unique: true });

    var admin = mongoose.model('admin', Admin);

    // Picker Schema
    const Picker = new mongoose.Schema({
        Picker_Username: {
            type: String
        },
        Log: {
            Start_Time: String,
            Task: Object,
            End_Time: String
        }
    })

    // Set Unique Values For Picker Account
    Picker.index({ Picker_Username: 1 }, { unique: true });

    var picker = mongoose.model('picker', Picker);

    // Developer Schema
    const Developer = new mongoose.Schema({
        Dev_Username: {
            type: String
        },
        Dev_Password: {
            type: String
        },
        Dev_Log: {
            Log: Array
        }
    })

    // Set Unique Value For Dev Account
    Developer.index({ Dev_Username: 1 }, { unique: true });

    var developer = mongoose.model('developer', Developer);

    return {
        admin,
        picker,
        developer
    };
}