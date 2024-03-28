import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

// swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Babel Chat API',
      version: '1.0.0',
    },
  },
  apis: ['../routes/*.js', '../models/'],
};
