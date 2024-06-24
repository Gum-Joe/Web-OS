// Generate certs
var NodeRSA = require('node-rsa');
var fs = require('fs');
var mkdirp = require('mkdirp');
var configh = require('jakhu-config');
var config = configh.getdata('./config/main.yml');
var home = process.env.HOME || process.env.SystemDrive + process.env.HOMEPATH;
var api = require('../../../build/Release/write');
var stat = require('../../../build/Release/stat').stat;
var generate = function generate(x) {
    // body...
    // Create key
    if (fs.existsSync("etc") !== true) {
        fs.mkdirSync('etc');
    }
    if (fs.existsSync("app/etc/certs") !== true) {
        fs.mkdirSync('app/etc/certs');
    }
    var key = new NodeRSA({
        b: 2048
    });
    if (fs.existsSync("app/etc/certs/" + config.name + "-private.pem") !== true) {
        fs.openSync("app/etc/certs/" + config.name + "-private.pem", 'w');
        fs.appendFileSync("app/etc/certs/" + config.name + "-private.pem", key.exportKey('pkcs1-private-pem'), 'utf8');
    };
    if (fs.existsSync("app/etc/certs/" + config.name + "-public.pem") !== true) {
        mkdirp('app/etc/certs');
        fs.openSync("app/etc/certs/" + config.name + "-public.pem", 'w');
        fs.appendFileSync("app/etc/certs/" + config.name + "-public.pem", key.exportKey('pkcs1-public-pem'), 'utf8');
    };
    if (stat(home + '.jakhu/certs/' + config.name + "-public.pem") === false) {
        api.write(home + '.jakhu/certs/' + config.name + "-public.pem", key.exportKey('pkcs1-public-pem'))
    }
    if (stat(home + '.jakhu/certs/' + config.name + "-public.pem") === false) {
        api.write(home + '.jakhu/certs/' + config.name + "-private.pem", key.exportKey('pkcs1-private-pem'))
    }
}

module.exports = {
    generate: generate
};