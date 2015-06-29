var express = require('express');
var app = express();
var userRouter = express.Router();
var UserDB = require('../models/user');
var authMethods = [{
  name: 'Google',
  url: '/auth/google'
}, {
  name: 'Facebook',
  url: '/auth/facebook'
}];

//creating session routes
userRouter.get('/', function (req, res) {
  console.log("request user ", req.user);
  if (req.user) {
    UserDB.find({
      displayName: req.user.displayName
    }).exec(function (err, user) {
      if (err) {
        console.log('Error: ', err);
      }
      console.log('exec user: ', user);
      res.status(200).send({
        id: user[0]._id,
        displayName: user[0].displayName,
        routes: user[0].routes
      });
    });
    //logged in
    console.log("loggedin");
  } else {
    //not logged in
    //401 not authenticated
    console.log("not loggedin");
    res.status(401).send({
      error: "not authenticated",
      authMethods: authMethods
    });
  }
});
userRouter.put('/', function (req, res) {
  UserDB.findOneAndUpdate({
    displayName: req.body.displayName
  }, {
    routes: req.body.routes
  }, null, function (err, user) {
    if (err) {
      console.log("put error:", err);
    }
    console.log('exec user: ', user);
    res.status(200).send({
      id: user._id,
      displayName: user.displayName,
      routes: user.routes
    });
  });
});

module.exports = userRouter;