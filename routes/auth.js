/*
 ** auth.js
 ** Used along with Passport.js with GoogleStrategy/FacebookStrategy to authenticate users and to store new users in DB.
 ** Existing users that are authenticated can save their routes in the DB.
 */

var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var UserDB = require('../models/user');
var googleConfig = require('../config/googleConfig');
var facebookConfig = require('../config/facebookConfig');
var authRouter = express.Router();

//if authentication succeeds, a session will be established and a cookie set in user's browser
// serializeUser is only called during authentication, which indicates what user information to store
// deserializeUser is invoked on every request by passport.sessions (making req.user object available in request handler)
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//Function that saves new user to UserDB (../models/user.js)
var saveUser = function (accessToken, refreshToken, profile, done) {
  UserDB.findOrCreate({
    loginId: profile.id,
    loginMethod: profile.provider,
    displayName: profile.displayName
  }, function (err, user, created) {
    if (err) {
      throw new Error("error:" + err);
    }
    return done(null, profile);
  });
};

//creates new Google Strategy/Facebook Strategy and passes along clientID/secret from googleConfig/facebookConfig (both obtained from respective Dev Console)
passport.use(new GoogleStrategy(googleConfig, function (accessToken, refreshToken, profile, done) {
  saveUser(accessToken, refreshToken, profile, done);
}));

passport.use(new FacebookStrategy(facebookConfig, function (accessToken, refreshToken, profile, done) {
  saveUser(accessToken, refreshToken, profile, done);
}));

//express routes that send user authentication; upon successful authentication from FB/Google, user is sent back to callback url
authRouter.get('/google', passport.authenticate('google', {
  scope: 'profile'
}));
//after successful authentication, user is sent back to homepage
authRouter.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), function (req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

authRouter.get('/facebook', passport.authenticate('facebook'));

authRouter.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), 
  function(req, res){
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = authRouter; 

