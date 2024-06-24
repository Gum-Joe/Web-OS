var mkdirp = require('mkdirp');
var clicolour = require("cli-color");
var exec = require('child_process').exec;

exports.createTmp = function createTmp(argument) {
    mkdirp("./tmp", function(err) {
        //console.log(clicolour.cyanBright('Created ./tmp...')+clicolour.greenBright("OK"));
    })
}

exports.clean = function clean(y, x) {
    // clean out ./tmp
    exec("rm -rfv ./tmp/*", function(error, stdout, stderr) {
        if (y === 'test') {
            // do nothin
        } else {
            //console.log('Cleaned out ./tmp...'+clicolour.greenBright("OK"));
        }
        if (stderr) {
            x(stderr);
        } else {
            x(null);
        }
    });
}