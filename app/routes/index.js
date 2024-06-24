var express = require('express');
var router = express.Router();
var fs = require('fs');
var dbName = "Jakhu";
var port = "27017";
var host = "localhost";
var kernal = require('../boot/boot.js');
var exec = require('child_process').exec;
var xml2js = require('xml2js');
var oobe = require('../../libs/setup/setup.js');
var os = require('os');
var clicolour = require('cli-color');
var db = require('../../libs/database');
var app = express();
var expresssession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../libs/database').user;
var bcrypt = require('bcryptjs');
var plocal = require('../../libs/passport/local.js');
var pgit = require('../../libs/passport/github.js');
var prem = require('../../libs/passport/rember.js');
var utils = require('util');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, function(err, user) {
        done(err, user)
    });
});
passport.use(plocal);
passport.use(prem);

router.use(expresssession({
    secret: 'jakhu',
    name: 'jakhu',
    saveUninitialized: false,
    resave: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(passport.authenticate('remember-me'));

/* GET home page. */
router.get('/', function(req, res) {
    // TODO: Insert boot checks
    console.log("");
    // No user, redirect to login
    // Or callback
    console.log(req.query.callback);
    if (!req.query.callback) {
        res.render('login.ejs', {
            callback: null
        });
    } else {
        res.render('login.ejs', {
            callback: req.query.callback
        });
    }
    /* exec("git rev-list HEAD --count", function (error, stdout) {
     *   res.render('boot.ejs', {
     *     build: stdout
     *   });
     * });
     */
});
// login
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/'
    }),
    function(req, res, next) {
        // issue a remember me cookie if the option was checked
        if (!req.body.remember_me) {
            return next();
        }

        var tokenn = utils.generateToken(64);
        Token.save({
            userId: req.user.id,
            token: tokenn
        }, function(err) {
            if (err) {
                return done(err);
            }
            res.cookie('remember_me', token, {
                path: '/',
                httpOnly: true,
                maxAge: 604800000
            }); // 7 days
            return next();
        });
    },
    function(req, res) {
        if (!req.query.callback) {
            res.redirect('/dashboard');
        } else {
            res.redirect(req.query.callback)
        }
    }
);
// Logout
router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
    // Github OAuthSchema
router.get('/auth/github',
    passport.authenticate('github', {
        scope: ['user:email', 'repo', 'repo:status', 'notifications', 'write:org', 'write:repo_hook', 'repo_deployment']
    }));

router.get('/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/'
    }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get('/signin', function(req, res) {
    // TODO: Insert boot checks
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('login.ejs', {
            build: stdout
        });
    });
});

router.get('/recovery', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('recovery.ejs', {
            build: stdout
        });
    });
});

router.get('/step1', function(req, res) {
    console.log("");
    exec("git rev-list HEAD --count", function(error, stdout) {
        res.render('step-1.ejs', {
            build: stdout
        });
    });
});

router.get('/oobe', function(req, res) {
    console.log("");
    res.render('oobe/index.ejs');
});

router.get('/admin', function(req, res) {
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

router.get('/info/alphawarn', function (req, res) {
  console.log("");
  res.render('__alpha/info.ejs')
})

module.exports = router;
