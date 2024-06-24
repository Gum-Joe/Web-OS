'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expresssession = require('express-session');
const clicolour = require('cli-color');
const fs = require("fs");
const morgan = require("morgan");
const mkdirp = require('mkdirp');
const delayed = require('delayed');
const minify = require('express-minify');

const connect = require("./libs/connect.js");
const mid = require('./libs/middleware.js')
const schema = require('./libs/database');
//const apis = require('./libs/api.js');
const notifications = require('./libs/api/notifications');
const wlogger = require('./libs/logger');
const kernal = require('./app/boot/boot');

const routes = require('./app/routes/index');
const api = require('./app/routes/api/api');
const users = require('./app/routes/users');
const ooberoutes = require("./app/routes/oobe.js");
const dashboard = require("./app/routes/dashboard.js");

const http = require('http');

let app = express();

// DEBUGING
var debug = {};
debug.http = require('debug')('server');

function use(param1, param2) {
    if (typeof param2 !== 'undefined') {
        app.use(param1, param2)
    } else {
        app.use(param1)
    }
}


exports.start = function start(x, y, portt) {
    var port = process.env.PORT || portt || 8080;
    var server = http.createServer(app);
    var io = require('./libs/socket.io');
    // create file
    mkdirp('logs');
    if (y !== true) {
        wlogger.createlog("ok");
    };
    // during baic startup for testing, will not create log
    if (y !== true) {
        var logFile = fs.createWriteStream('./logs/wos.log', {
            flags: 'a'
        });
    }
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /views/public
    app.use(favicon(path.join(__dirname, 'views/public', 'icon.png')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(minify({
        js_match: /js/,
        css_match: /css/,
        sass_match: /scss/,
        cache: __dirname + '/tmp/cache'
    }))
    app.use(express.static(path.join(__dirname, 'views/public')));
    app.use(express.static(path.join(__dirname, 'bower_components')));
    app.use(express.static(path.join(__dirname, 'node_modules')));
    app.use(express.static(path.join(__dirname, 'views')));
    app.use(express.static(path.join(__dirname, 'test')));
    //app.use(mid.count);
    app.use(mid.timer);
    if (process.env.NODE_ENV === "dev") {
        app.set('env', 'development');
    }

    app.use('/', routes);
    app.use('/oobe', ooberoutes);
    app.use('/users', users);
    app.use('/dashboard', dashboard);
    app.use('/api', api);
    // Tmp stuff
    app.use('/docs', require('./app/routes/docs'))
    // listen
    // Se
    if (y === true || x === 'basic' || x === 'ci') {
        server.listen(port);
    } else {
        server.listen(port, function() {
            debug.http('Starting server...');
            if (!process.env.DEBUG) {
                process.env.DEBUG = "none"
            }
            if (~process.env.DEBUG.indexOf('server')) {
                debug.http("Running on port " + port);
                debug.http("The date and time is:", Date());
            } else {
                console.log(clicolour.cyanBright("jakhu ") + clicolour.yellowBright("startup ") + "Running on port " + port);
                console.log(clicolour.cyanBright("jakhu ") + clicolour.yellowBright("startup ") + "The date and time is:", Date());
            }
            connect.connect();
            debug.http('Done starting server');
            kernal.startinput("ok");
        });
    }
    // Start socket.io
    io.start(server)
        // Invoke api
    //apis.init(port)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    // error handlers
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error.jade', {
                message: err.message,
                error: err
            });
        });
    }
    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.jade', {
            message: err.message,
            error: {}
        });
    });
    // end of start function
};
