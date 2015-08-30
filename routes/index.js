var express = require('express');
var router = express.Router();
var passportconfig = require("../libs/passport.js");
var passport = require("passport");
var passportLocal = require("passport-local");
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var cursor = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var kernal = require('../boot/boot.js');

var mongoose = require('mongoose');

var dbName = "web-os";
var port = "27017";
var host = "localhost";
var kernal = require('../boot/boot.js');
var exec = require('child_process').exec;
var xml2js = require('xml2js');

var oobe = require('../libs/setup/setup.js')

// connect to db
// done in connect.js
//mongoose.connect('mongodb://localhost:27017/web-os');

var userSchema = new mongoose.Schema({
  username: { type: String }
, email: String
, pwd: String
});

var configSchema = new mongoose.Schema({
  lang: { type: String }
, region: String
, allowSend: String
, dev: Boolean
});
var exits = false;
var Suser = mongoose.model('usersch', userSchema);
var config = mongoose.model('config', configSchema);
var counts = getdocs("ok");

function getdocs(x){
  Suser.count({}, function(err, count){
    return count;
    counts = count;
});

};

console.log(counts);

router.use('passportconfig', passportconfig);

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: Insert boot checks
  console.log("");
      exec("git rev-list HEAD --count", function (error, stdout, stderr) {
        res.render('boot.ejs', {
          build: stdout
        });
      });
  });

router.get('/start', function(req, res, next) {
  console.log("");
  exec("git rev-list HEAD --count", function (error, stdout, stderr) {
    res.render('index.ejs', {
      build: stdout
    });
  });
  });

  router.get('/type', function(req, res, next) {
    console.log("");
    exec("git rev-list HEAD --count", function (error, stdout, stderr) {
      res.render('installType.ejs', {
        build: stdout
      });
    });
    });
  router.post('/set-lang', function(req, res, next) {
    console.log("");
    // Here would be installing language packs but none are avalible
    console.log("Language: "+req.body.lang);
    console.log("Region: "+req.body.region);
    console.log("Allow sending: "+req.body.allow);
    oobe.builder.buildLang(req.body.lang, req.body.region, req.body.allow);
    res.redirect('/type')
  });
  router.get('/set-install-standard', function(req, res, next) {
    console.log("");
    exec("git rev-list HEAD --count", function (error, stdout, stderr) {
      res.redirect('/opt-standard');
    });
  });

  router.get('/opt-standard', function(req, res, next) {
    console.log("");
    exec("git rev-list HEAD --count", function (error, stdout, stderr) {
      res.render('options-standard.ejs', {
        build: stdout
      });
    });
  });

  router.get('/recovery', function(req, res, next) {
    console.log("");
    exec("git rev-list HEAD --count", function (error, stdout, stderr) {
      res.render('recovery.ejs', {
        build: stdout
      });
    });
    });

router.get('/step1', function(req, res, next) {
  console.log("");
  exec("git rev-list HEAD --count", function (error, stdout, stderr) {
    res.render('step-1.ejs', {
      build: stdout
    });
  });
});

router.get('/oobe', function(req, res, next) {
  console.log("");
  res.render('oobe/index.ejs');
});

router.get('/admin', function(req, res, next) {
  console.log("");
  res.render('admin/index.ejs', {
    // url query (?x=y)
    user: req.param("user"),
    //users: Suser.count({}, function(err, count){
    //return count;
///})
    users: 1000,
    sessions: 500,
    plugins: 5
  });

  });

router.post('/login', function(req, res, next) {
  console.log("");
    //passport.authenticate('local');
  // res.render('index.html', { title: 'Done' });
});

function checkBoot(argument) {
  fs.stat('./tmp', function(err){
    if(err == null){
      var boot = false;
    } else {
      var boot = true;
    }
  });
}

module.exports = router;
