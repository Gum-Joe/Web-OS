// Git method
'use strict'

/**
 * Modules dependencies
 */
const Git = require('nodegit');
const path = require('path');
const debug = require('debug')('git');
const fs = require('fs');
const IDGenerator = require('id-generator')
const vbox = require("virtualbox");
const mkdirp = require("mkdirp");
let idg = new IDGenerator()
    // Use gitex as module.exports
let gitex = module.exports = {}
    /**
     * Normalize a url (i.e remove the x://)
     * @param url {String} Dir to Normalize
     * @return {String}
     */
const normalizeURL = (url) => {
        if (url.startsWith('https://')) {
            return url.slice(8, url.length)
        }
        if (url.startsWith('http://')) {
            return url.slice(7, url.length)
        }
        if (url.startsWith('git://')) {
            return url.slice(6, url.length)
        }
        return url;
    }
    // String methods
    /**
     * Repo class
     * @param dir {String} Directory of repo
     */
    /**
     * Repo info class
     */
function GetSHA(dir) {
    var commitSHA = this.commitSHA;
    Git.Repository.open('./').then((repo) => {
        commitSHA = repo.getMasterCommit();
        console.log(commitSHA);
    })
    return commitSHA;
}

/**
 * Repo class
 * @param dir {String} Repo dir
 */
function Repo(dir) {
     this.dir = dir;
     this.id = idg.newId()
     idg.reset();
 }
/**
 * Clone method
 * @param url {String} Repo url
 */
Repo.prototype.clone = function(url, callback) {
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('git://')) {
        // Clone
        debug('Repo format valid');
        debug("url: %o", url)
        debug("dir: %o", this.dir)
        debug("id: %o", this.id)
        Git.Clone(url, this.dir).then(callback).catch(
          (err) => {
            callback(null, err)
          });
    } else {
        debug('Repo format invalid');
        const errmessage = new Error("Invalid repo format - must start with 'https://', 'http://' or 'git://'")
        if (callback) {
            return callback(null, errmessage)
        } else {
            throw errmessage;
        }
    }
    // Return class git.RepoInfo
    return 'Cloned'
};
/**
 * Checks
 * @param callback {Function} Callback
 */
Repo.prototype.checks = function(onEach, callback, onFinish) {
    const steps = 3
    debug('Running checks on created repo with id %o', this.id)
        // Does the repo exist?
    debug('Checking if repo exists...')
    onEach(1, steps, "Checking if repo exists...")
    console.log(fs.existsSync(this.dir));
    if (fs.existsSync(this.dir)) {
        debug('Repo exists!')
        return callback(new Error(`Repo already exists! (Preparing, step 1 of ${steps})`))
    }
    // TODO: check for a boot2doker machine
    const dockervm = process.env.JAKHU_DOCKER_MACHINE || 'default'
    debug('Starting boot2docker machine %o...', dockervm)
    onEach(2, steps, "Starting boot2docker vm...")
    if (process.platform === 'darwin' || process.platform === 'win32') {
        // Check for boot2docker
        vbox.start(dockervm, function(err) {
            if (err) {
                return callback(new Error(`Could not start boot2docker vm. Full error from vbox: \n${err}\n (Preparing, step 2 of ${steps})`))
            } else {
                debug(`VBox says boot2docker machine ${dockervm} is now booting...`)
            }
        })
    } else {
        debug('Linux. Not starting vm.')
    }
    debug('Creating dir for webapp...')
    onEach(3, steps, 'Creating dir for webapp...')
    mkdirp(this.dir, (err) => {
        if (err) {
            return callback(new Error(`Failed to create dir for web-app. Full error: ${err} (Preparing, step 3 of ${steps})`))
        } else {

        }
    })
    onEach(steps + 1, steps, "[code] done")
    onFinish();
};
/**
 * Get the repo name
 */
Repo.prototype.getDir = function () {
  return this.dir;
};

/**
 * Build a repo
 * @param onEach {Function} Ran after each step
 * @param onLog {Function} Ran on log
 */
Repo.prototype.build = function (onEach, onLog) {
  const steps = 10
  debug('Appplying basic .gitignore settings...')
  onEach(1, steps, "Appplying basic .gitignore settings...")
  fs.openSync(path.join(this.dir, '.gitignore'), 'a')
  fs.appendFileSync(path.join(this.dir, '.gitignore'), '\n# Jakhu stuff\n.jakhu/*\nDockerfile.jakhu.*')
  debug('Commiting changes...')
  Git.Repository.open(this.dir).then((repo) => {

  }).catch(
    (err) => {
      console.log(err);
    })
};
gitex.Repo = Repo;
gitex.normalizeURL = normalizeURL;
