const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '단어 학습 앱 API',
      version: '1.0.0',
      description: '단어 학습 앱을 위한 API 문서',
    },
    servers: [
      {
        url: 'https://words.sungho.site',
        description: '운영 서버',
      },
      {
        url: 'http://localhost:' + (process.env.PORT || 3000),
        description: '개발 서버',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'session-id'
        }
      }
    }
  },
  apis: ['./index.js', './routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = {
  specs,
  swaggerUi
};