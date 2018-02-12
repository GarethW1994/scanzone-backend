//require assert
const assert = require('assert');
const models = require('../modules/Modules');
const path = require('path');
const fs = require('fs');

//connect to MongoDB
var Models = models('mongodb://localhost/backend-log');

// describe('Create Admin User', function () {
//     // Before Each Function - Clear DB
//     beforeEach(function (done) {
//         Models.admin.find({}, function (err) {
//             Models.admin.remove({}, function (err) {
//                 done(err);
//             });
//         });
//     });


//     it('Should Create A New Admin Account', function (done) {
//         // New Admin Object
//         var newAdmin = {
//             Admin_Username: "Sandile",
//             Admin_Password: "12345"
//         }

//         // Create Admin Account And Save To Mongo
//         Models.admin.create(newAdmin, function (err, result) {
//             if (err) throw err;

//             assert.equal(null, err)


//             // Write Process To Dev Log
//             let test = function (err) { if (!err) { return 'success' } else { return 'error occured' } };

//             let dev_log = { process: "Adding New Admin Account", date: new Date.now(), err: err, status: test() };

//             fs.writeFile('./dev_log_test.txt', JSON.stringify(dev_log), (err) => {
//                 if (err) throw err;
//                 console.log('The file has been saved!');
//             });
//         });
//         done();
//     });
// });

describe('Create Picker Account', function (done) {
    // Before Each Function - Clear DB
    Models.picker.find({}, function (err) {
        Models.picker.remove({}, function (err) {
            done(err);
        });
    });

    it('Should Create A New Picker Log', function (done) {
        // New Picker Log
        var newPickerLog = {
            Picker_Username: "Peter",
            Log: {
                Start_Time: new Date("2018-02-12 10:00:00"),
                Task: "Process Order",
                End_Time: new Date("2018-02-12 13:00:00")
            }
        }

        // Create New Picker Log And Save To Mongo
        Models.picker.create(newPickerLog, async function (err, result) {
            if (err) throw err;

            assert.equal(null, err);

            // Write Process To Dev Log
            let checkState = function(err) { if (!err) {return true} else {return false}};

            let dev_log = { Date: new Date().toString(), Msg: "Adding New Picker Log", Error: err, Success: checkState(err)};

          await fs.appendFile('dev_log_test.json', JSON.stringify(dev_log) , 'utf-8', (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        });
        done();
    });
});

// describe('Create Developer Account', function (done) {
//     // Before Each Function - Clear DB
//     Models.developer.find({}, function (err) {
//         Models.developer.remove({}, function (err) {
//             done(err);
//         });
//     });

//     it('Should Create New Developer Log', function (done) {
//         // New Developer Log
//         // var newDevLog = {
//         //     Developer_Username: 'Christian',
//         //     Developer_Password: 'Chris123',
//         //     Dev_Log: 
//         // }

//         // // Create New Dev Log And Save To Mongo
//         // Models.developer.create(newDevLog, function (err, result) {
//         //     if (err) throw err;

//         //     assert.equal(null, err);
//         //     console.log(result)
//         // });
//         done();
//     });

// });