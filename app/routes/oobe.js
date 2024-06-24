var express = require('express');
var ooberouter = express.Router();
//var kernal = require('../boot/boot.js');
var exec = require('child_process').exec;
// redefine when needed
//var xml2js = require('xml2js');

var oobe = require('../../libs/setup/setup.js');
var os = require('os');
//var kernal = require('../boot/boot.js');
var fs = require('fs');
var db = require('../../libs/database');

/* GET home page. */
ooberouter.get('/', function(req, res) {
    // TODO: Insert boot checks
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('boot.ejs', {
            build: stdout
        });
    });
});

ooberouter.get('/signin', function(req, res) {
    // TODO: Insert boot checks
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('signin.ejs', {
            build: stdout
        });
    });
});

ooberouter.get('/start', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/index.ejs', {
            build: stdout
        });
    });
});

ooberouter.get('/license', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/license.ejs', {
            build: stdout
        });
    });
});
ooberouter.get('/decline', function(req, res) {
    // TODO: Add License handlers
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/decline.ejs', {
            build: stdout
        });
    });
});

ooberouter.get('/decline-y', function(req, res) {
    // TODO: Add License handlers
    // oobe.license.decline();
    console.log("");
    res.redirect('/wosl');
});

ooberouter.get('/decline-n', function(req, res) {
    console.log("");
    res.redirect('/license');
});

ooberouter.get('/accept', function(req, res) {
    console.log("");
    // TODO: Add license handlers
    // oobe.license.accept();
    res.redirect('/wosl');
});
ooberouter.get('/wosl', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/licensewos.ejs', {
            build: stdout
        });
    });
});
ooberouter.get('/declinew', function(req, res) {
    // TODO: Add License handlers
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/declinewos.ejs', {
            build: stdout
        });
    });
});

ooberouter.get('/declinew-y', function(req, res) {
    // TODO: Add License handlers
    // oobe.license.web.decline();
    console.log("");
    res.redirect('/type');
});

ooberouter.get('/declinew-n', function(req, res) {
    console.log("");
    res.redirect('/wosl');
});

ooberouter.get('/acceptw', function(req, res) {
    console.log("");
    // TODO: Add license handlers
    // oobe.license.web.accept();
    res.redirect('/type');
});

ooberouter.get('/type', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/installType.ejs', {
            build: stdout
        });
    });
});
ooberouter.post('/set-lang', function(req, res) {
    console.log("");
    // Here would be installing language packs but none are avalible
    console.log("Language: " + req.body.lang);
    console.log("Region: " + req.body.region);
    console.log("Allow sending: " + req.body.allow);
    oobe.builder.buildLang(req.body.lang, req.body.region, req.body.allow);
    res.redirect('/oobe/license');
});

ooberouter.post('/install-standard', function(req, res) {
    console.log("");
    // Here would be installing language packs but none are avalible
    // TODO: Add console.log() req.body.stuff
    console.log(req.body.allow);
    console.log(os.type());
    // TODO: Create scripts

    // TODO: Add running basic install, installing apps and finishing and rendering of install page
    /**exec("./scripts/", function (error, stdout) {
      res.redirect('/start');
    });
    */
});

ooberouter.get('/set-install-standard', function(req, res) {
    console.log("");
    res.redirect('/opt-standard');
});

ooberouter.get('/opt-standard', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('oobe/options-standard.ejs', {
            build: stdout
        });
    });
});


function checkBoot(argument) {
    fs.stat('./tmp', function(err) {
        if (err === null) {
            //return bootc = false;
        } else {
            //var bootc = true;
        }
    });
}

module.exports = ooberouter;