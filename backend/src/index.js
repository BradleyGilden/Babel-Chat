import express from "express";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import socketio from "socket.io";
import socketInit from "./socketEvents";
import baseRouter from "./routes";
import errorHandler from "./middleware/errorHandler";
import mongooseConnect from "./db/connect";
import notFound from "./middleware/404";
import swaggerDocs from './utility/swagger';
import { generateSecretKey } from "./auth";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// initialize the global variable
global.io = io;

// Middleware declarations
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("tiny")); // logger
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
