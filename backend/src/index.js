import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import baseRouter from './routes';
import errorHandler from './middleware/errorHandler';
import serverInit from './utility/init';
import notFound from './middleware/404'

// get environment variable files form .env for testing
dotenv.config();

const app = express();

// Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));  // logger
app.use('/', baseRouter);
app.use(notFound);  // for default routes
app.use(errorHandler);  // for handling error responses

const serverStartup = async () => {
  const server = await serverInit(app);
}

serverStartup();
