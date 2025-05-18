const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Boscov API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e filmes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './src/users/routes.js',   // Rota dos usuários
    './src/movies/routes.js',  // Rota dos filmes
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
