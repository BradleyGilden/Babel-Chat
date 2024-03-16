import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import baseRouter from './routes';
import errorHandler from './middleware/errorHandler';
import serverInit from './utility/init';

// get environment variable files form .env for testing
dotenv.config();

const app = express();

// Middleware declarations
app.use(cors());
app.use(morgan("dev"));
app.use('/', baseRouter);
app.use(errorHandler);

const serverStartup = async () => {
  const server = await serverInit(app);
}

serverStartup();
