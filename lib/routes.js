var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport){

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    router.get('/auth/runkeeper', passport.authenticate('runkeeper'),
    function(req, res){
        // The request will be redirected to RunKeeper for authentication,
        // so this function will not be called.
    });

    router.get('/auth/runkeeper/callback',
    passport.authenticate('runkeeper', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/a');
    });

    router.get('/a', isAuthenticated, function(req, res){
        res.render('a', { user: req.user });
    });

    return router;
}
