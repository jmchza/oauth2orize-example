'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
var morgan = require('morgan');

// Express configuration
const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'))
// Passport configuration
const auth = require('./auth');
var redis = require('redis');
// create a new redis client and connect to our local redis instance
var client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});
client.on("ready", function () {
  console.log("Cache is connected");
});

app.get('/', routes.site.index);
app.get('/login', routes.site.loginForm);
app.post('/login', routes.site.login);
app.get('/logout', routes.site.logout);
app.get('/account', routes.site.account);

app.get('/auth/oauth2/authorize', routes.oauth2.authorization);
app.post('/auth/oauth2/authorize/decision', routes.oauth2.decision);
app.post('/auth/oauth2/token', routes.oauth2.token);

app.get('/api/userinfo', routes.user.info);
app.get('/api/clientinfo', routes.client.info);
app.post('/api/tokens', routes.site.tokens);
app.get('/api/seetokens', routes.site.seetokens);

//im not happy with this....... Manuel
client.hset("client_0", [ 'id', '1', 'name', 'Samplr', 'clientId', 'abc123', 'clientSecret', 'ssh-secret', 'isTrusted', false ], function (err, res) {});
client.hset("client_1", [ 'id', '2', 'name', 'Samplr2', 'clientId', 'xyz123', 'clientSecret', 'ssh-password', 'isTrusted', true ], function (err, res) {});
client.hgetall("client_0", function (err, obj) {
    console.dir(obj);
});

client.hset("user_0", ['id', '1', 'username', 'bob', 'password', 'secret', 'name', 'Bob Smith' ] , function (err, res) {});
client.hset("user_1", [ 'id', '2', 'username', 'joe', 'password', 'password', 'name', 'Joe Davis' ],function (err, res) {});
client.hkeys("user_0", function (err, obj) {
    console.dir(obj);
});

routes.site.setClient(client, 2);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('OAuth2 provider APP is listening on port ' + port);
});

module.exports = client;
