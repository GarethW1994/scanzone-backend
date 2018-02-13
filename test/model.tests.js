//require assert
const assert = require('assert');
const models = require('../modules/Modules');
const devlog = require('../log/DevLog');
const fs = require('fs');

//connect to MongoDB
var Models = models('mongodb://localhost/backend-log');

// Initialise Devlog
var DevLog = devlog();

describe('Create Admin User', function () {
    // Before Each Function - Clear DB
    beforeEach(function (done) {
        Models.admin.find({}, function (err) {
            Models.admin.remove({}, function (err) {
                assert.equal(null, err);
                done(err);         
            });
        });
    });


    it('Should Create A New Admin Account', function (done) {
        // New Admin Object
        var newAdmin = {
            Admin_Username: "Sandile",
            Admin_Password: "12345"
        }

        // Create Admin Account And Save To Mongo
        Models.admin.create(newAdmin, function (err, result) {
            if (err) throw err;

            assert.equal(null, err);

            done();      
        });
    });
});

describe('Create Picker Account', function () {
    // Before Each Function - Clear DB
    beforeEach(function(done) {
        Models.picker.find({}, function (err) {
            Models.picker.remove({}, function (err) {
                assert.equal(null, err);
                done(err);            
            });
        });
    });

    it('Should Create A New Picker Log', function (done) {
        // New Picker Log
        var newPickerLog = {
            UserId: "1001PY",
            Picker_Username: "Peter",
            Log: {
                Login_Time: new Date("2018-02-12 10:00:00"),
                Task: "Process Order",
                Logout_Time: new Date("2018-02-12 13:00:00")
            }
        }

        // Create New Picker Log And Save To Mongo
        Models.picker.create(newPickerLog, async function (err, result) {
            if (err) throw err;

            assert.equal(null, err);
    
            done();   
        });
    });
});

describe('Create Developer Account', function () {
    // Before Each Function - Clear DB
    beforeEach(function(done) {
        Models.developer.find({}, function (err) {
            Models.developer.remove({}, function (err) {
                assert.equal(null, err);
                done(err)
            });
        });
    });

    it('Should Create New Developer Log', function (done) {
        // New Developer Log
        var newDevLog = {
            Dev_Username: "Christian",
            Dev_Password: 'Chris123'
        }

        // Create New Dev Log And Save To Mongo
        Models.developer.create(newDevLog, function (err, result) {
            if (err) throw err;
            
            assert.equal(null, err);
      
            done();        
        });
    });
});

describe('Dev Log', function() {
    it('Should Write Log To File For Developer', async function (done) {
      // Write Process To Dev Log
      let operation = "Updated Stock";
      let err = null;

      let dev_log = new Date().toString() + " Process: " + operation + " - Error: " + err + "\r\n" + "\r\n";

      fs.appendFile('TestLogs/dev_log_test.txt', dev_log, 'utf-8', (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
      });

      assert.equal(null, err)
      done();

      process.exit();
    });
});

