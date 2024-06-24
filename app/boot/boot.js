// The Jakhu Boot script
var execSync = require('child_process').execSync;
execSync('node ./app/usr/bin/check.config.js');

var express = require('express');
//var git = require('nodegit');
var exec = require('child_process').exec;
var boot = require('./index.js');
exports.boot = require('./index.js');
var app = require("../../app.js");
exports.oobe = require("../../libs/setup/setup.js");
var oobe = require("../../libs/setup/setup.js");
var fs = require('fs');
var unzip = require('unzip');
var config = require('./libs/configure.js');
var cert = require('./libs/certs.js');

var io = require('socket.io')(express.listen);
var delayed = require('delayed');
var debug = require('debug')('boot');
//boot.properties.git.getCommits;
//start boot
// TODO: Create boot types (safemode, full, recovery)
/**
 * Start booting
 * 
 * @param boottype {string}
 */
exports.startboot = function startboot(boottype) {
    // Load configure
    debug('Booting server...');
    config.loadconfig();
    debug('Checking if all files exist...')
    boot.checks.files.checkFiles("ok");
    /**delayed.delay(function () {
      boot.checks.instances.instances(config.getdata('name'));
    }, 300)*/
    //Start DB
    debug('Checking if this server has already been set up...')
    oobe.first("ok");
    debug('Creating a rollback backup..')
    boot.recovery.rollback.createBackup("ok");
    // load certs
    debug('Loading certs...')
    delayed.delay(function() {
        cert.generate();
    }, 1000);
    debug('Preparing tmp files in app/etc/ ')
    fs.writeFileSync('app/etc/date.txt', new Date().getHours(), 'utf8')
    fs.appendFileSync('app/etc/date.txt', new Date().getMinutes(), 'utf8')
        // Record start time:
    if (fs.existsSync('app/etc/starttime.txt') !== true) {
        fs.openSync('app/etc/starttime.txt', 'w+');
        fs.writeFileSync('app/etc/starttime.txt', Date.now());
    } else {
        fs.writeFileSync('app/etc/starttime.txt', Date.now())
    }
    // Delete previous up
    if (fs.existsSync('app/etc/requesttotal.txt')) {
        fs.writeFileSync('app/etc/requesttotal.txt', "0");
    }
    debug("Starting jakhu server %s", config.getdata().name)
    app.start();

}

// TODO: Create boot types (safemode, full, recovery)

/**
 * Start input func
 * @param x {any}
 */
exports.startinput = function startinput(x) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    var util = require('util');
    process.stdin.on('data', function(text) {
        debug('received data: %o', util.inspect(text));
        if (text === 'stop\n') {
            boot.stop();
        }
        if (text === 'rs\n') {
            boot.monstop();
        }
        if (text === 'restart\n') {
            process.emit('restart', true);
        }
    });
}