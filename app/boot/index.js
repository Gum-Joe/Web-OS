exports.checks = require('./libs/checks/index.js');
exports.properties = require('./libs/properties.js');
exports.recovery = require('./recovery/index.js');
exports.kernal = require('./kernal/index.js');
exports.mongo = require('./kernal/mongo.js');
var fs = require('fs');
var clicolour = require('cli-color');

exports.stop = function stop(x) {
    if (x !== 'test') {
        console.log(clicolour.redBright("Stopping the Jakhu server..."));
    }
    // Remove tmp and exit
    // TODO: Change exit to whereever last step is.
};

exports.monstop = function monstop(x) {
    if (x !== 'test') {
        console.log(clicolour.redBright("Stopping the Jakhu server..."));
    }
    // Remove tmp and exit
    // TODO: Change exit to whereever last step is.
}