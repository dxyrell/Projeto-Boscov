const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Boscov API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários, filmes e avaliações',
    },
    tags: [
      {
        name: 'Usuários',
        description: 'Operações relacionadas aos usuários',
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
        name: 'Autenticação',
        description: 'Login e autenticação dos usuários',
      },
    ],
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './src/auth/routes.js',     // Rota de login/autenticação
    './src/users/routes.js',    // Rota de usuários
    './src/movies/routes.js',   // Rota de filmes
    './src/reviews/routes.js',  // Rota de avaliações
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
