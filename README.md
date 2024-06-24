# jakhu [![Dep Status](https://travis-ci.org/Gum-Joe/jakhu.svg?branch=a1)](https://travis-ci.org/Gum-Joe/jakhu) [![Coverage Status](https://coveralls.io/repos/Gum-Joe/jakhu/badge.svg?branch=a1&service=github)](https://coveralls.io/github/Gum-Joe/jakhu?branch=a1) <a href="https://codeclimate.com/github/Gum-Joe/jakhu"><img src="https://codeclimate.com/github/Gum-Joe/jakhu/badges/gpa.svg" /></a> [![Dependency Status](https://david-dm.org/Gum-Joe/jakhu.svg)](https://david-dm.org/Gum-Joe/jakhu) [![devDependency Status](https://david-dm.org/Gum-Joe/jakhu/dev-status.svg)](https://david-dm.org/Gum-Joe/jakhu#info=devDependencies)

Jakhu is a simple, nodejs based, app for managing your web-app(s). It has a modern dashboard, lets you run, test and deploy apps to your favourite service provider (coming soon) and - most importantly - keeps a backup of your web-apps.

One of my really early projects in JS when I was just starting.

# Goals
I need to:
* Create a way to manage web-apps
* Test the code (get ~90% test coverage for cli and browser tests)
* The dashboard should be modern, attractive and informative
The status of this is available in CHANGELOG.md and ROADMAP.md

# Building
## Unix (Debian, Ubuntu, CentOS) and Mac OSX
Simple install coming soon!
Prerequisites:
* gcc and g++ 4.8 or newer, or
* clang and clang++ 3.4 or newer (for node-gyp)
* Nodejs v4.0.0 or newer (v5.3.0 reccommended) & npm
* Python
* Ruby
* Docker
* Vagrant (if you want to run and test web-apps in vagrant boxes or run the database in vagrant)
* Virtual box (for vagrant)
* Mongodb (if you don't want to use docker or vagrant)

<h5>Building:</h5>
```
$ [sudo] npm install -g coffee-script grunt-cli node-gyp
$ [sudo] gem install bundle
$ npm install
$ bundle install
$ grunt sass:dist
```
<h5>Getting started:</h5>
```
$ export NODE_ENV=development
$ ./bin/jakhu server
```

## Windows
Prerequisites:
* Microsoft Visual Studio C++ 2013
* Nodejs v4.0.0 or newer (v5.3.0 reccommended) & npm
* Python
* Ruby
* Docker with `docker-machine`
* Vagrant (if you want to run and test web-apps in vagrant boxes or run the database in vagrant)
* Virtual box (for vagrant & docker)
* Mongodb (if you don't want to use docker or vagrant)
* A bash enviroment (git-bash, mingw, cygwin, msys) with `git`

<h5>Building:</h5>
```
$ npm install -g coffee-script grunt-cli node-gyp
$ gem install bundle
$ npm install
$ bundle install
$ grunt sass:dist
```
<h5>Getting started:</h5>
```
$ export NODE_ENV=development
$ ./bin/jakhu server
```

To run in a Vagrant box (from host):
`bin/jakhu vagrant`

## Tests:
`mocha test/**/*.js`
