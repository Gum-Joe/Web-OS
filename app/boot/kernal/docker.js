// Starts the required docker stuff
var YAML = require('yaml-js');
var YAM = require('yamljs');
var fs = require('fs');
var tub = require('Jakhu-container');
var tubx = require('Jakhu-container/libs/run.js');
var spawnSync = require('child_process').spawnSync;

function bootDB() {
    // body...
    // check to see if vagrant is installed
    var vagrant = spawnSync('vagrant', ['--version']);
    if (vagrant.stderr.toString('utf8') !== "") {
        throw new Error('Vagrant is not installed! Please install it.')
    } else {
        // Start
        var db = spwan('sh', ['./dbv.sh'])
    }
};
module.exports = {
    boot: bootDB
};
bootDB();