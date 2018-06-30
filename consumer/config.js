'use strict';

module.exports = {
  oauth2ServerBaseUrl: 'http://localhost:3000',
  authorizationUrl: '/auth/oauth2/authorize',
  tokenUrl: 'http://localhost:3000/auth/oauth2/token',
  clientId: 'xyz123',
  clientSecret: 'ssh-password',
  callbackUrl: 'http://localhost:3002/auth/oauth2-example/callback'
};
