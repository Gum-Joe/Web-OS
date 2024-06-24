/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var RememberMeStrategy = require('passport-remember-me').Strategy;
var Token = require('../database').token;
var bcrypt = require('bcryptjs');
var utils = require('util');

/**
 * Expose
 */
module.exports = new RememberMeStrategy(
    function(token, done) {
        Token.consume(token, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    },
    function(user, done) {
        var token = utils.generateToken(64);
        Token.save({
            userId: user.id,
            token: token
        }, function(err) {
            if (err) {
                return done(err);
            }
            return done(null, token);
        });
    }
)