
//facebook clientId and Secret from https://developers.facebook.com/apps
//This file is used with /config/routes/auth.js to authenticate FB users
var facebookConfig = {
    clientID: '130802563917598',
    clientSecret: '7a1bb563a6dfebb5c4992bf21470d5ad',
    callbackURL: "http://munib.herokuapp.com/auth/facebook/callback",
    enableProof: false
  };

module.exports = facebookConfig;