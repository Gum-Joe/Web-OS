var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var request = require("request");

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var clicolour = require('cli-color');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var delayed = require('delayed');
var debug = require('debug')('database');
var errord = require('debug')('database:error');
var stdouta = require('debug')('database:stdout');
var stderra = require('debug')('database:error');
var dburl = process.env.JAKHU_DB_URL || "localhost:27017"
    // awaiting solve
    // var bcrypt = require('bcrypt');

// connect
exports.stadaradconnect = function(x, callback) {
    var url = 'mongodb://localhost:27017/Jakhu';
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        if (x !== 'test') {
            console.log(clicolour.cyanBright("jakhu ") + clicolour.magentaBright("database ") + "Connected correctly to mongo server.");
        } else {
            if (err) {
                callback('error');
            } else {
                callback('connected');
            };
        };
        db.close();
    });
};

function startdbrun(argument) {
    var dockermac = process.env.DOCKER_HOST;
    var dockerip = dockermac.slice(6, dockermac.length - 5) || "0.0.0.0";
    // body...
    exec('docker run --name jakhumongodb -p 27018:27017 -d mongo', (err, stdout, stderr) => {
        debug('Running command "docker run --name jakhumongodb -p 27018:27017 -d mongo"');
        stdouta('stdout:');
        stdouta(stdout);
        stderra('stderr:');
        stderra(stderr);
        if (err) {
            //console.error("Error when starting mongodb!");
            //console.error(err);
            return;
        }
    });
    delayed.delay(function() {
        connect("no", `${dockerip}:27018`);
    }, 1000)
}

function startdb() {
    // body...
    // stop container
    var dockermac = process.env.DOCKER_HOST;
    var dockerip = dockermac.slice(6, dockermac.length - 5);
    if (process.env.JAKHU_RUN_TYPE == "docker" || process.env.JAKHU_RUN_TYPE == undefined) {
        //exec('docker stop jakhumongodb', (err, stdout, stderr) => {
        //	debug('Running command "docker stop jakhumongodb"');
        //	debug('stdout:');
        //	stdouta(stdout);
        //	debug('stderr:');
        //	stderra(stderr);
        //	if (err) {
        //		//console.error("Error when starting mongodb docker container!");
        //  	//console.error(err);
        //	}
        //});
        // start it.
        // hide errors
        exec('docker start jakhumongodb', (err, stdout, stderr) => {
            debug('Running command "docker start jakhumongodb"');
            debug('stdout:');
            stdouta(stdout);
            debug('stderr:');
            stderra(stderr);
            if (err) {
                //console.error("Error when starting mongodb docker container!");
                //console.error(err);
                startdbrun();
            } else {
                delayed.delay(function() {
                    connect("no", `${dockerip}:27018`);
                }, 1000)
            }
        });
    }
}

exports.connect = function(x, call) {
    // Start db
    // Check if started
    if (process.env.JAKHU_RUN_TYPE === "docker" || typeof process.env.JAKHU_RUN_TYPE === 'undefined') {
        var dockerhost = process.env.DOCKER_HOST;
        var dockerip = dockerhost.slice(6, dockerhost.length - 5) || "0.0.0.0";
        request("http://" + dockerip + ":27018", function(error, response, body) {
            if (error) {
                // start db
                if (~process.env.DEBUG.indexOf('database')) {
                    debug("Starting MongoDB in a docker container...");
                } else {
                    console.log(clicolour.cyanBright("jakhu ") + clicolour.magentaBright("database ") + "Starting MongoDB in a docker container...");
                }
                startdb();
            } else {
                if (~process.env.DEBUG.indexOf('database')) {
                    debug("Starting MongoDB in a docker container...");
                } else {
                    console.log(clicolour.cyanBright("jakhu ") + clicolour.magentaBright("database ") + "Starting MongoDB in a docker container...");
                }
                startdb();
            }
        });
    } else {
        if (x === "test") {
            connect("test", dburl);
        } else {
            connect("e", dburl);
        }
    }
}

function connect(type, porttt) {
    mongoose.connect(`mongodb://${porttt}/jakhu`);

    db = mongoose.connection;
    retry = 0
    db.on('error', function(err) {
        retry = retry + 1;
        if (retry <= 3) {
            if (~process.env.DEBUG.indexOf('database')) {
                debug("Connection to db failed. Retrying...");
            } else {
                console.log(clicolour.cyanBright("jakhu ") + clicolour.magentaBright("database ") + "Connection to db failed. Retrying...")
            }
            mongoose.connect(`mongodb://${porttt}/jakhu`);
        } else {
            if (~process.env.DEBUG.indexOf('database')) {
                errord("Maximum amount of retries exceeded!");
            } else {
                console.log(clicolour.cyanBright("jakhu ") + clicolour.magentaBright("database ") + "Maximum amount of retries exceeded!");
            }
            throw err;
        }
    });
    db.once('open', function(callback) {
        if (~process.env.DEBUG.indexOf('database')) {
            debug("Yay! We succefully connected to the db");
        } else {
            console.log(clicolour.cyanBright("jakhu ") + clicolour.magentaBright("database ") + "Yay! We succefully connected to the db");
        }
    });
}