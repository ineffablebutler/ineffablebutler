var env = require('../env.js');

//google clientId and clientSecret made from https://console.developers.google.com/project
var googleConfig = {
    clientID: env.googleClientId,
    clientSecret: env.googleClientSecret,
    callbackURL: env.googleCb
  };

module.exports = googleConfig;