'use strict';

// const clients = [
//   { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret', isTrusted: false },
//   { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', isTrusted: true },
// ];
var client;
var counter;

module.exports.findById = (id, done) => {
  for (let i = 0, len = counter; i < len; i++) {
    client.hgetall('client_'+i, function (err, obj) {
        if (err) done(new Error('Client Not Found'));
        if (obj.id === id) done(null, obj);
    });
  }
};

module.exports.findByClientId = (clientId, done) => {
  for (let i = 0, len = counter; i < len; i++) {
    client.hgetall('client_'+i, function (err, obj) {
        if (err) done(new Error('Client Not Found'));
        if (obj.clientId === clientId) done(null, obj);
    });
  }
};

module.exports.setClient =  function(inClient, length) {
  client = inClient;
  counter = length;
}
