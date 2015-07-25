
//facebook clientId and Secret from https://developers.facebook.com/apps
//This file is used with /config/routes/auth.js to authenticate FB users
var facebookConfig = {
    clientID: '1684524431776154',
    clientSecret: '469dc8ad6b2fc3c55881ffa410471d6a',
    callbackURL: "http://munib.herokuapp.com/auth/facebook/callback",
    enableProof: false
  };

module.exports = facebookConfig;