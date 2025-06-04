const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Boscov API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários, filmes e avaliações',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      {
        name: 'Autenticação',
        description: 'Login e autenticação dos usuários',

      },
      {
        name: 'Filmes',
        description: 'Operações relacionadas aos filmes',
      },
      {
        name: 'Avaliações',
        description: 'Operações relacionadas às reviews dos filmes',
      },
      {
        name: 'Usuários',
        description: 'Operações relacionadas aos usuários',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // Aplica o JWT globalmente a todas as rotas (opcional)
    // security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/auth/routes.js',
    './src/users/routes.js',
    './src/movies/routes.js',
    './src/reviews/routes.js',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
