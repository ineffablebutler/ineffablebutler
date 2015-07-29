var env = require('../env.js');
//facebook clientId and Secret from https://developers.facebook.com/apps
//This file is used with /config/routes/auth.js to authenticate FB users
var facebookConfig = {
    clientID: env.fbClientId,
    clientSecret: env.fbClientSecret,
    callbackURL: env.fbCb,
    enableProof: false
  };

module.exports = facebookConfig;