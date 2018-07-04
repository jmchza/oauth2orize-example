'use strict';

const passport = require('passport');
const login = require('connect-ensure-login');
const db = require('../db');

var client;

module.exports.index = (request, response) => response.send('OAuth 2.0 Server');

module.exports.loginForm = (request, response) => response.render('login');

module.exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/account', failureRedirect: '/login' });

module.exports.tokens = (request, response, done) => {
  console.log(request.userId + '============'+ request.clientId)
  var res = db.accessTokens.findByUserIdAndClientId(1, 'xyz123'
    , (error, token) => {
    if (error) return done(error);
    if (!token) return done(null, false);

  }
);

}

module.exports.seetokens = (request, response) => response.render('seetokens');

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => response.render('account', { user: request.user }),
];

module.exports.setClient =  function(inClient, length) {
  client = inClient;
  db.clients.setClient(inClient, length);
  db.users.setClient(inClient, length);
  db.authorizationCodes.setClient(inClient);
  db.accessTokens.setClient(inClient);
}
