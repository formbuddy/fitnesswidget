var rkauth = require('./rkauth.js');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    // Setting up Passport Strategies for Runkeeper
    rkauth(passport);
}
