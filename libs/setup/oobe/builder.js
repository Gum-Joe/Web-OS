var fs = require('fs');
var clicolour = require('cli-color');
//var mkdirp = require('mkdirp');
//var error = require('../../error/bsod.js');
var xml = require('xml');
var exec = require('child_process').exec;
var langObj;


exports.buildLang = function buildLang(x, y, z) {
    console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "Createing xml...");
    // Create xml to write to
    exec("echo > ./config/config.xml", function(error, stdout) {
        console.log(stdout);
    });
    if (z !== undefined) {
        langObj = [{
            config: [{
                language: x
            }, {
                region: y
            }, {
                allowSend: true
            }]
        }];
        fs.writeFile("./config/config.xml", xml(langObj, true), function(err) {
            if (err) {
                console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "XML..." + clicolour.redBright("ERROR!"));
                return console.log(err);
            }

            console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "XML created!");
        });
        console.log(xml(langObj, true));
    } else {
        langObj = [{
            config: [{
                language: x
            }, {
                region: y
            }, {
                allowSend: false
            }]
        }];
        fs.writeFile("./config/config.xml", xml(langObj, true), function(err) {
            if (err) {
                console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "XML..." + clicolour.redBright("ERROR!"));
                return console.log(err);
            }

            console.log(clicolour.cyanBright("Jakhu ") + clicolour.yellowBright("oobe ") + "XML created!");
        });
        console.log(xml(langObj, true));
    }
};