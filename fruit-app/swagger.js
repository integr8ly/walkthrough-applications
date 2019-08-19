const swagger = require('swagger-jsdoc');

const options = {
  definition: {
    info: {
      title: 'Fruit CRUD Application',
      version: '1.0.0',
      description: 'Basic CRUD application for fruit'
    },
  },
  apis: ['./server.js']
};

module.exports = {
  swaggerSpec: swagger(options)
};
