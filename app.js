var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var routes = require('./routes/index');
var db = require('./config/db');
var UserDB = require('./models/user');
var UserHandler = require('./handlers/UserHandler');
var AuthHandler = require('./handlers/AuthHandler');

var app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


passport.use(new GoogleStrategy({
    clientID: '189160676278-ci6rhq98n64ig2ekbb4ojst990u6tg6s.apps.googleusercontent.com',
    clientSecret: 'SkWnFwdTOG69OgDZi092hHqC',
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    UserDB.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

// passport.use(new google_strategy({
//     clientID: '189160676278-ci6rhq98n64ig2ekbb4ojst990u6tg6s.apps.googleusercontent.com',
//     clientSecret: 'SkWnFwdTOG69OgDZi092hHqC',
//     callbackURL: 'http://127.0.0.1:3000/auth/google/callback', 
//     scopes: 'https://www.googleapis.com/auth/userinfo.email'
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log("boum", accessToken, refreshToken, profile, done);

//     UserDB.findOne({email: profile._json.email},function(err,usr) {
//       if (err){
//         console.log(err);
//       }
//       if (usr){
//         console.log("user",usr);
//         usr.token = accessToken;    
//         usr.save(function(err,usr,num) {
//             if(err) {
//                 console.log('error saving token');
//             }
//         });
//         process.nextTick(function() {
//             return done(null,profile);
//         });
//       } else {
//         console.log("no user");
//       }
//     });
//   }
// ));

var handlers = {
  user: new UserHandler(),
  auth: new AuthHandler()
};



// app.get('/auth/google',handlers.auth.googleSignIn);
// app.get('/auth/google/callback',handlers.auth.googleSignInCallback);
// // app.get('/auth/local',handlers.auth.localSignIn);
// // app.get('/auth/local/callback',handlers.auth.localSignInCallback);

app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/hhghg' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/user',handlers.user.getUsers);
app.get('/user/:id',handlers.user.getUser);
app.put('/user/:id',handlers.user.updateUser);
app.get('/user/:first/:last/:email',handlers.user.createUser);
console.log("Successfully set up routes");



app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
