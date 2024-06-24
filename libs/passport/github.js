/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github2').Strategy;
var Oauthschema = new mongoose.Schema({
    githubUser: String,
    profile: Object,
    token: String
});
var Oauth = mongoose.model('oauth', Oauthschema);
var User = require('../database').user;
var bcrypt = require('bcryptjs');

/**
 * Expose
 */
var port = process.env.PORT || "8080"
module.exports = new GitHubStrategy({
        clientID: "b801626d40c4da6fbe72",
        clientSecret: "576d206d320566f78a8ae4160f147bf0b2da8675",
        callbackURL: `http://127.0.0.1:${port}/auth/github/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        // Does profile exist
        // Store id
        // FIXME
        Oauth.insert({
            githubUser: profile.username,
            profile: profile,
            token: bcrypt.hashSync(accessToken, 10)
        }, function(err) {
            if (err) {
                throw new Error(err);
            }
        });
        Oauth.findOne({
            githubUser: profile.username
        }, function(err, user) {
            var profilen = {
                _id: profile.id,
                username: profile.username
            };
            return done(null, profilen);
        });
    });