var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// passport for login
var passport = require('passport');
var passportlocal = require('passport-local');
var passporthttp = require('passport-http');

var routes = require('../app/routes/index');
var users = require('../app/routes/users');

var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// awaiting solve
// var bcrypt = require('bcrypt');

var connect = require("../private/connect.js");
exports.signup = function(username, email, pwd, salt) {
    connect.connect("ok");

    // connect
    //hash the password
    var susername = req.body.username;
    var semail = req.body.email;
    var pass = req.body.pass;

    var signupuser = new user({
        username: susername,
        email: semail,
        pwd: pass
    });

    /*
    user.findOne({ username: susername }, function(err, signupuser) {
      if (!err){
          console.log("User tried to signup taken username");
          exits = true;
          res.render("signupREAL.ejs");
      };
    });
    */



    signupuser.save(function(err, signupuser) {
        if (err) {
            return console.error("Errors storing DATA: " + err);
        } else {
            console.log("Done");
            res.render('signin.ejs');
        }
    });

    // later
    /// bcrypt.genSalt(10, function(err, salt) {
    // for later pass = bcrypt.hash(res.body.pass, salt, function(err, hash) {
    // Store hash in your password DB. 
    // });
    // });
    // db.collection('users').insertOne({ "username": susername, "email": semail, "password": pass });

    console.log("Sign Up succesful");
    console.log("Storing...");

}