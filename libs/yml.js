var fs = require('fs');
var YAML = require('yamljs');

var parse = function parse(file) {
    // body...
    return YAML.load(file);
}

module.exports = {
    parse: parse
};