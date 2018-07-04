'use strict';

var redis = require("redis");
// const tokens = {};
var client;
var counter;

module.exports.find = (key, done) => {
  console.log('key: ' + key);
  console.log('tokens: ' + tokens);
  client.hgetall(key, function (err, obj) {
      if (err) done(new Error('Client Not Found'));
      done(null, obj);
  });

  // var entry = tokens[key];
  // console.log('entry: ' + entry);
  // if (entry) {
  //   return done(null, tokens[key]);
  // }else{
  //   console.log('if never entered.......');
  // }
  // return done(new Error('Token Not Found'));
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  console.log('userId: ' + userId+ ' clientId: ' + clientId);
  for (var token in tokens) {
    console.log('tokens[token].userId:: ' + tokens[token].userId + ' tokens[token].clientId: ' + tokens[token].clientId);
    console.log('tokens[token].userId:: ' + tokens[token].userId == userId + ' tokens[token].clientId: ' + tokens[token].clientId === clientId);
    console.log(' tokens[token].clientId: ' + tokens[token].clientId == clientId);
    if (tokens[token].userId == userId && tokens[token].clientId == clientId) return done(null, token);
  }
  return done(new Error('Token Not Found'));
};

module.exports.save = (token, userId, clientId, done) => {
  console.log('persisting token in DB: ' + token);
  client.hset(token, [ 'userId', userId, 'clientId', clientId], redis.print);
  // tokens[token] = { userId, clientId };
  done();
};

module.exports.setClient =  function(inClient) {
  client = inClient;
}
