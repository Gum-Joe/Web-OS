var fs = require('fs');
var clicolour = require('cli-color');
var mkdirp = require('mkdirp');
var error = require('../error/bsod.js');
//var builder = require('./oobe/builder.js');
exports.builder = require('./oobe/builder.js');
//var setup = require('')

exports.first = function first() {
    // First time setup
    fs.stat('../../config', function(err) {
        if (err === null) {
            // do noting
        } else if (err.code === 'ENOENT') {
            mkdirp('config', function(err) {
                if (err) {
                    error.throwError("SETUP_CREATE_DIR_CONFIG", err, err.code);
                } else {
                    //console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "Created config dir");
                }
            });
        } else {
            error.throwError("BOOT_CHECKS_FILES_" + err.code + ":" + "config", err, err.code);
        }
    });

    fs.stat('../../instances', function(err) {
        if (err === null) {
            // do noting
        } else if (err.code === 'ENOENT') {
            mkdirp('instances', function(err) {
                if (err) {
                    error.throwError("SETUP_CREATE_DIR_INSTANCES", err, err.code);
                } else {
                    //console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "Created Instances dir");
                }
            });

        } else {
            error.throwError("BOOT_CHECKS_FILES_" + err.code + ":" + "instances", err, err.code);
        }
    });

    fs.stat('../../tmp', function(err) {
        if (err === null) {
            // do noting
        } else if (err.code === 'ENOENT') {
            mkdirp('tmp', function(err) {
                if (err) {
                    error.throwError("SETUP_CREATE_DIR_TMP", err, err.code);
                } else {
                    //console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "Created tmp dir");
                }
            });

        } else {
            error.throwError("BOOT_CHECKS_FILES_" + err.code + ":" + "config", err, err.code);
        }
    });
};