// Gets the config for Jakhu
var YAML = require('yamljs');
var fs = require('fs');
var assert = require('assert');
var checks = require('./checks/instances.js');
var delayed = require('delayed');
var config = require('jakhu-config');
var mkdirp = require('mkdirp');
// parse YAML string
module.exports = {
    loadconfig: function loadconfig() {
        //load();
    },
    getdata: function getdata() {
        // parse YAML
        var parsed = YAML.parse(fs.readFileSync('./config/main.yml', 'utf8'));
        return parsed;
    }
};