# oauth2orize-example


1. Checkout the right branch
2. Run the server located in the provider directory (Command: node app.js)
3. Run the server located in the consumer directory (Command: node app.js)
4. Open a browser and go to this page:  http://localhost:3002/login
5. Follow all the links to generate a new OATH Access token
6. Copy the Access token from the last page and call the next operation with the Authorization header set:
  (either with Postman or with the curl command as shown below)
   curl -v -H "Authorization: Bearer token" http://127.0.0.1:3000/api/userinfo
