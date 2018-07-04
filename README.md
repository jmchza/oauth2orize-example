# oauth2orize-example

Following is the sequence to follow:

1. http://localhost:3002/login
2. Follow all the links.....
3. Last call:
curl -v -H "Authorization: Bearer token" http://127.0.0.1:3000/api/userinfo
