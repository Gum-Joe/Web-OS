var config = require('../configure.js');
//var config = confi.getdata;
var assert = require('assert');
var fs = require('fs');

module.exports = {
    instances: function instances() {
        //var data = config.getdata('instances');
        //console.log(data);
        if (fs.existsSync('./tmp/config.yml') !== true) {
            delayed.delay(function() {
                for (var i = 0; i < config.getdata().instances.length; i++) {
                    if (fs.existsSync('./instances/' + config.getdata().instances[i]) !== true) {
                        assert.fail('ERNOENT', null, 'Expected instance "' + config.instances[i] + '" to exist')
                    };
                };
            }, 1500)
        } else {
            for (var i = 0; i < config.getdata().instances.length; i++) {
                if (fs.existsSync('./instances/' + config.getdata().instances[i]) !== true) {
                    assert.fail('ERNOENT', null, 'Expected instance "' + config.instances[i] + '" to exist')
                };
            };
        }
    }
};