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
  if (req.user) {
    UserDB.find({
      displayName: req.user.displayName
    }).exec(function (err, user) {
      if (err) {
        throw new Error('Error: ' + err);
      }
      console.log('exec user: ', user);
      res.status(200).send({
        id: user[0]._id,
        displayName: user[0].displayName,
        routes: user[0].routes
      });
    });
    //logged in
  } else {
    //not logged in
    //401 not authenticated
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
      throw new Error("put error:" + err);
    }
    res.status(200).send({
      id: user._id,
      displayName: user.displayName,
      routes: user.routes
    });
  });
});

module.exports = userRouter;
