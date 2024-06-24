var YAML = require('yamljs');
var appymlfile = "config/apps.yml";
module.exports = {
    getApps: function(app) {
        // Load YML file with apps
        var appyml = YAML.load("config/apps.yml");
        return appyml;
    }
}