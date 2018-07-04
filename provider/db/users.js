'use strict';

// const users = [
//   { id: '1', username: 'bob', password: 'secret', name: 'Bob Smith' },
//   { id: '2', username: 'joe', password: 'password', name: 'Joe Davis' },
// ];
var client;
var counter;

module.exports.findById = (id, done) => {
  for (let i = 0, len = counter; i < len; i++) {
    client.hgetall('user_'+i, function (err, obj) {
        if (err) done(new Error('User Not Found'));
        // console.dir('resp:: ' + obj.username);
        if (obj.id === id) {
          console.log('matched...........');
          done(null, obj);
        }
    });
  }
};

module.exports.findByUsername = (username, done) => {
  console.log('username: ' + username);

  for (let i = 0, len = counter; i < len; i++) {
    client.hgetall('user_'+i, function (err, obj) {
        if (err) done(new Error('User Not Found'));
        // console.dir('resp:: ' + obj.username);
        if (obj.username === username) {
          console.log('matched...........');
          done(null, obj);
        }
    });
  }
};

module.exports.setClient =  function(inClient, length) {
  client = inClient;
  counter = length;
}
