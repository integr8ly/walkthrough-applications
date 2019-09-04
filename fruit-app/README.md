# Fruit CRUD Application

Very basic CRUD application for fruit

## Local Development Setup

- Install dependencies, `npm install`
- Run the server, `npm start`

When `client.js` has been modified, run `npm run client:build`

Application is then accessible on http://localhost:8080/ if `process.env.PORT` is undefined.

## Building and Running Application in Docker locally

```
docker build -t quay.io/integreatly/fruit-crud-app .
docker run -d --name fruit-crud-app -p 8080:8080 quay.io/integreatly/fruit-crud-app
```

Application is then accessible on http://localhost:8080/

