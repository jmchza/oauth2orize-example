'use strict';
var redis = require("redis");

// const tokens = {};
var client;
// const counter = 0;

module.exports.find = (key, done) => {
  client.hgetall(key, function (err, obj) {
      if (err) done(new Error('Token Not Found'));
      done(null, obj);
  });
};

//not happy with this
module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  var flag= true;
  var i = 0;
  do {
    client.hgetall('user_'+i, function (err, obj) {
        if (err) done(new Error('Token Not Found'));
        // console.dir('resp:: ' + obj.username);
        if (obj.userId === userId && obj.clientId === clientId) {
          flag = false;
          console.log('matched...........');
          done(null, obj);
        }
    });
    i++;
  }while(flag);
  //
  // for (var token in tokens) {
  //   if (tokens[token].userId === userId && tokens[token].clientId === clientId) return done(null, token);
  // }
  // return done(new Error('Token Not Found'));
};

module.exports.save = (token, userId, clientId, done) => {
  console.log('persisting token: ' + token + ' for userId: ' + userId + ' clientId: ' + clientId);
  client.hset(token, [ 'userId', userId, 'clientId', clientId], redis.print);
  // tokens[token] = { userId, clientId };
  done();
};

module.exports.setClient =  function(inClient) {
  client = inClient;
}
