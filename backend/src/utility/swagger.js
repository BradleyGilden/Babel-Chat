import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

// swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Babel Chat API',
      version,
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Set's up swagger for api documentation
 * @param {express} app instance of express application
 * @param {number} port 
 */
const swaggerDocs = (app, port) => {
  // Swagger ui page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  })

  console.log(`Docs are available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
