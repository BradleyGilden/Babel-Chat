import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import socketio from "socket.io";
import socketInit from "./socketEvents";
import baseRouter from "./routes";
import errorHandler from "./middleware/errorHandler";
import mongooseConnect from "./db/connect";
import session from "express-session";
import notFound from "./middleware/404";
import swaggerDocs from './utility/swagger';
import { generateSecretKey } from "./auth";

// get environment variable files form .env for testing
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// initialize a global variable
global.io = io;

// Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  }),
);
app.use(morgan("tiny")); // logger
app.use(
  session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: false,
  }),
);
// api docs
swaggerDocs(app, PORT);
app.use("/api", baseRouter);
app.use(notFound); // for default routes
app.use(errorHandler); // for handling error responses

const serverStartup = async () => {
  await mongooseConnect();

  server.listen(PORT, () => {
    console.log("server starting on port", PORT);
  });

  // initialize socket server listeners
  socketInit(io);
};

serverStartup();
