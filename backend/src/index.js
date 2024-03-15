import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import baseRouter from './routes';
import mongooseConnect from './db/connect';
import errorHandler from './middleware/errorHandler';

// get environment variable files form .env for testing
dotenv.config();

const app = express();

// Middleware declarations
app.use(cors());
app.use(morgan("dev"));
app.use('/api', baseRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server starting on port 3000");
  // establish database connection
  mongooseConnect();
});
