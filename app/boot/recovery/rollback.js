var mkdirp = require('mkdirp');
var error = require('../../../libs/error/bsod.js');
var clicolour = require("cli-color");
var datea = "./app/recovery/rollback/backup";
var exec = require('child_process').exec;
var debug = require('debug')('boot:recovery');

exports.createBackup = function createBackup(x) {
    if (x === "test") {
        mkdirp("./tmp/test", function(err) {
            if (err) {
                error.throwError("RECOVERY_ROLLBACK_CREATE_BACKUP_DIR:" + err.code, err, err.code);
            } else {
                //console.log(clicolour.cyanBright("Jakhu ")  + clicolour.yellowBright("recovery ")  + "Created Rollback DIR for today");
            };
        });
        // Copy test stuff
        exec("cp -R ./misc/testing/* ./tmp/", function() {
            //console.log(clicolour.cyanBright("Jakhu ")  + clicolour.yellowBright("recovery ")  + "Created rollback Backup");
        });
    } else {
        mkdirp(datea, function(err) {
            if (err) {
                error.throwError("RECOVERY_ROLLBACK_CREATE_BACKUP_DIR:" + err.code, err, err.code);
            } else {
                debug("Created Rollback DIR for today");
            };
        });
        // Create backup
        if (process.env.NODE_ENV !== "dev") {
            exec("cp -R ./ ~/.jakhu/recovery/rollback/backup", function(error, stdout, stderr) {
                debug("Created rollback Backup");
            });
            // rm .git
            exec("rm -rf ~/.jakhu/recovery/rollback/backup/.git ~/.jakhu/recovery/rollback/backup/node_modules", function(error, stdout, stderr) {
                debug("Removed .git folder and node_modules");
            });
        } else {
            debug("Not backing up as dev env");
        }
    };
};