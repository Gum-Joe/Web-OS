'use strict';
const express = require('express');
let router = express.Router();
const exec = require('child_process').exec;
const delayed = require('delayed');
const config = require('../boot/libs/configure.js');
const fs = require('fs');
const YAML = require('yamljs');
const runner = require('../../libs/runner/findapp.js');
const root = "dashboard"
const templates = `${root}/templates`
const App = require("jakhu-container").App;
const db = require('../../libs/database.js');
/* GET dashborad home. */
router.get('/', function(req, res, next) {
    if (!req.user) {
        // No user, redirect to login
        // Or callback
        res.redirect('/');
    } else {
        let rwas;
        let uptime;
        let requestarray;
        let downtime;
        let apps;
        const start = Date.now();
        fs.readFile('app/etc/starttime.txt', 'utf8', (err, data) => {
            if (err) {
                throw err;
            } else {
                let runtime = parseInt(start) - parseInt(data);
                fs.readFile('app/etc/requesttotal.txt', 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        let frun = runtime - parseInt(data);
                        if (frun > 10000) {
                            const x = Math.round(frun / 100);
                            downtime = x.toString();
                        } else {
                            downtime = frun.toString();
                        }
                    }
                })
            }
        });
        fs.readFile('app/etc/requesttotal.txt', 'utf8', (err, data) => {
            if (err) {
                throw err;
            } else {
                if (parseInt(data) > 10000) {
                    const ndata = parseInt(data) / 100;
                    const nndata = Math.round(ndata);
                    uptime = nndata.toString() + " s";
                } else {
                    uptime = data + " ms";
                }
            }
        })
        db.tubs.find({}, (err, count) => {
                if (err) {
                    throw err;
                }
                rwas = count.length;
            })
            // Request data
        db.Requests.find({}, (err, data) => {
                if (err) {
                    throw err;
                }
                requestarray = data;
            })
            // Apps data
        db.Apps.find({}, (err, data) => {
            if (err) {
                throw err;
            }
            apps = data;
        })
        var d = fs.readFileSync('app/etc/date.txt').toString();
        var fd = parseInt(d);
        var de = new Date().getHours().toString() + new Date().getMinutes().toString();
        exec("git rev-list HEAD --count", function(error, stdout) {
            var parsedreq = YAML.parse(fs.readFileSync('./app/etc/requests.yml', 'utf8'));
            res.render('dashboard/index.ejs', {
                user: req.user.username || req.user,
                imgprofile: '/css/img/profile.jpg',
                instances: config.getdata().instances,
                port: config.getdata().port,
                config: config.getdata(),
                showcase: '/css/img/showcase.jpg',
                time: de - fd,
                rwas: rwas,
                uptime: uptime,
                requestdata: requestarray,
                downtime: downtime,
                webapps: apps,
                quickactionjson: require('../../config/quickactions.json').actions
            });
        });
    }
});

// GET app data
router.get('/apps/status', function(req, res, next) {
    // Check auth
    console.log("");
    if (!req.user) {
        // No user, redirect to login
        res.redirect(`/?callback=/dashboard/apps/status?app=${req.query.app}`);
    } else {
        // Find app
        // App
        const appreq = req.query.app;
        // Load YAML
        this.apps = runner.getApps(req.query.author, req.query.app).apps;
        var appobj = {};
        // Find correct app
        for (var i = 0; i < this.apps.length; i++) {
            if (`${this.apps[i].author}/${this.apps[i].name}` === appreq) {
                appobj = {
                    name: this.apps[i].name,
                    author: this.apps[i].author
                };
            }
        }
        // Get app info
        const instances = "app/instances";
        try {
            const appinfo = YAML.load(`${instances}/${appobj.author}/${appobj.name}/.jakhu.yml`);
        } catch (err) {
            //do whatever with error
            err.message = `Could not find app ${appobj.author}/${appobj.name} - does it exist?`;
            next(err)
        }
        //onsole.log(`App: ${appobj}`);
        res.render(`${templates}/apps/status.ejs`, {
                app: appobj,
                apps: this.apps,
                user: req.user.username || req.user,
                imgprofile: '/css/img/profile.jpg',
                info: appinfo
            })
            //res.send(appobj)
    }
});

router.param(['author', 'name'], function(req, res, next, value) {
    res.send(value);
    next();
});

router.get('/apps/start', function(req, res, next) {
    if (!req.user) {
        res.redirect('/');
    } else {
        var neapp = new App(req.query.author, req.query.app);
        neapp.autoTubs()
            //neapp.final()
        res.redirect(req.query.callback);
    }
    //res.send(req.author);
})

// New app
router.get('/new/app', function(req, res, next) {
        console.log();
        //if (!req.user) {
        //res.redirect('/?callback=/dashboard/new/app');
        //} else {
        res.render('dashboard/__pages/new/app.ejs')
            //}
    })
    // New app - github
router.post('/new/app/github-handler', function(req, res, next) {
    console.log();
    //if (!req.user) {
    //  res.redirect('/?callback=/dashboard/new/app/github-handler');
    //} else {
    res.render('dashboard/__pages/new/app-github.ejs', {
            repo: req.body.repo
        })
        //}
})
router.get('/new/app/github-handler/build', function (req, res, next) {
  //if (!req.user) {
  //  res.redirect('/?callback=/dashboard/new/app/github-handler');
  //} else {
  res.render('dashboard/__pages/new/app-github-build.ejs', {
          repo: req.query.repo
  })
      //}
})

module.exports = router;
