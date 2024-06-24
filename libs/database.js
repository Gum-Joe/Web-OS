// Database script
var mongoose = require('mongoose');
var db = module.exports = {};
// scheme
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    pwd: String
});
db.user = mongoose.model('users', UserSchema);

const OAuthSchema = new mongoose.Schema({
    githubUser: String
});
db.oauth = mongoose.model('oauthh', OAuthSchema);

const TokenSchema = new mongoose.Schema({
    userId: String,
    token: String
});
db.token = mongoose.model('rememberme', TokenSchema);

const NotifSchema = new mongoose.Schema({
    app: String,
    text: String,
    iconPath: String,
    link: String
});
db.notification = mongoose.model('notifications', NotifSchema);

const AppSchema = new mongoose.Schema({
    name: String,
    path: String,
    author: String,
    iconPath: String,
    installDate: Date,
    version: String,
});
//db.Apps = mongoose.model('apps', AppSchema);

const TubsSchema = new mongoose.Schema({
    name: String,
    for: String,
    running: Boolean,
    containerid: String
});
db.tubs = mongoose.model('tubs', TubsSchema)

const Requests = new mongoose.Schema({
    method: String,
    route: String,
    starttime: Date,
    endtime: Date,
    time: Number
});
db.Requests = mongoose.model('requests', Requests)

const AppsSch = new mongoose.Schema({
    name: String,
    author: String,
    language: String,
    tubs: Number,
    running: Boolean
})
db.Apps = mongoose.model('apps', AppsSch);