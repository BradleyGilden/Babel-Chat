import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import socketio from 'socket.io';
import socketInit from './socketEvents';
import baseRouter from './routes';
import errorHandler from './middleware/errorHandler';
import mongooseConnect from './db/connect';
import session from 'express-session';
import notFound from './middleware/404'
import { generateSecretKey } from './auth';

// get environment variable files form .env for testing
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

// Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
}));
app.use(morgan("dev"));  // logger
app.use(session({
  secret: generateSecretKey(),
  resave: false,
  saveUninitialized: false,
}));
app.use('/api', baseRouter);
app.use(notFound);  // for default routes
app.use(errorHandler);  // for handling error responses

const serverStartup = async () => {
  await mongooseConnect();

  server.listen(process.env.PORT || 3000, () => {
    console.log("server starting");
  })

  socketInit(io);
}

serverStartup();
