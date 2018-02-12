const fs = require('fs');


module.exports = function() {

    const write = async function(operation, err) {

            // Write Process To Dev Log

            let dev_log = new Date().toString() + " Process: " + operation + " - Error: " + err  + "\r\n" + "\r\n";

          await fs.appendFile('TestLogs/dev_log_test.txt', dev_log, 'utf-8', (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

        return 'Success';
    }

    return {
        write
    }
}