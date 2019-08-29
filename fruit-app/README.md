# Fruit CRUD Application

Very basic CRUD application for fruit

## Local Development Setup

- Install dependencies, `npm install`
- Run the server, `npm run`

When `client.js` has been modified, run `npm run client:build`

Application is then accessible on http://localhost:8080/ if process.env.PORT is undefined.

## Building and Running Application in Docker locally

```
# sudo is only necessary in CentOS, Fedora, or RHEL systems
sudo docker build -t quay.io/integreatly/fruit-crud-app .
sudo docker run -d --name fruit-crud-app -p 8080:8080 quay.io/integreatly/fruit-crud-app
```

Application is then accessible on http://localhost:8080/

