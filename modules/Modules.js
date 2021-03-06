const mongoose = require('mongoose');
const assert = require('assert');

module.exports = function (url) { //mongodb://greets:greets@ds064299.mlab.com:64299/liwa-greetings-webapp
    // Use connect method to connect to the server
    mongoose.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to mongodb server");

        // db.close();
    });
    
    // Use native promises
    mongoose.Promise = global.Promise;

    //ACtivity Scheme
    const logSchema = new mongoose.Schema({
        loginTime: String,
        task:[],
        logOutTime: String
    })
    //User Schema
    var UserSchema = new mongoose.Schema({  
        username: String,
        role: String,
        password: String,
        log: [logSchema]
      });

    // Set unique values for users
    UserSchema.index({username: 1}, {unique: true});

    var user =  mongoose.model('user', UserSchema);

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
        UserId: {
            type: String
        },
        Picker_Username: {
            type: String
        },
        Log: {
            Login_Time: String,
            Task_Done: String,
            Logout_Time: String
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
        }
    })

    // Set Unique Value For Dev Account
    Developer.index({ Dev_Username: 1 }, { unique: true });
    var developer = mongoose.model('developer', Developer);

    // Item Schema
    const Items = new mongoose.Schema({
        PO_number : String,
        Supplier_number : String,
        Order_date : Date,
        Details:Array
    })
    Items.index({PO_number: 1 }, { unique: true });
    var items = mongoose.model('items', Items);

   const purchaseOrders = new mongoose.Schema({
            PO: {
                type: String
            },
            SupplierNo: {
                type: String
            },
            totalAmount: {
                type: Number
            },
            orderDate: {
                type: String,
                default: new Date().toLocaleDateString()
            },
            Details: {
                type: Array
            }
    })

    // Set Unique Values For purchase order
    purchaseOrders.index({ PO : 1 }, { unique: true });

    var PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrders);



    return {
        items,
        user,
        admin,
        picker,
        developer,
        items,
PurchaseOrder
    };
}
