import express from 'express';
import morgan from 'morgan';
import baseRouter from './routes';
import mongooseConnect from './db/connect';
import dotenv from 'dotenv';

// get environment variable files form .env for testing
dotenv.config();

const app = express();

// Middleware declarations
app.use(morgan("dev"))
app.use('/api', baseRouter);

app.listen(3000, () => {
  console.log("server starting on port 3000");
  // establish database connection
  mongooseConnect();
});
