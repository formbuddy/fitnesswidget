var RunKeeperStrategy = require('passport-runkeeper').Strategy;
var Config = require('../credentials.js');
var User = require('../models/user.js');

var RUNKEEPER_CLIENT_ID = Config.runkeeper_client_id;
var RUNKEEPER_CLIENT_SECRET = Config.runkeeper_client_secret;
var SERVER_HOST = Config.server_host;
var SERVER_PORT = process.env.PORT || 3000;
var CALLBACKURL = "http://" + SERVER_HOST + ":" + SERVER_PORT + "/auth/runkeeper/callback";

module.exports = function(passport){
    passport.use(new RunKeeperStrategy({
        clientID: RUNKEEPER_CLIENT_ID,
        clientSecret: RUNKEEPER_CLIENT_SECRET,
        callbackURL: CALLBACKURL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('accessToken = ' + accessToken);
        console.log('refreshToken = ' + refreshToken);
        User.findOrCreate({runkeeperID: profile.id}, {accessToken: accessToken, refreshToken: refreshToken}, function(err, user){
            return done(err, user);
        });
    }));
}
