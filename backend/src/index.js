import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import socketio from 'socket.io';
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
app.use('/api', baseRouter);
app.use(notFound);  // for default routes
app.use(errorHandler);  // for handling error responses

const serverStartup = async () => {
  const server = await serverInit(app);
  const io = socketio(server, {
    cors: {
      origin: "*",
    }
  });

  io.on('connection', (socket) => {
    console.log('connected');
    socket.on('join room', (roomInfo) => {
      const roomName = roomInfo.currentRoom;
      socket.join(roomName);
      console.log('joined room', roomInfo)
      const room = io.sockets.adapter.rooms.get(roomInfo.currentRoom);
      const numClientsInRoom = room ? room.size : 0;
      roomInfo.date = new Date();
      io.to(roomName).emit(`${roomName}-status`, { socketId: socket.id, numClients: numClientsInRoom, ...roomInfo})
    })

    socket.on('room message', (messageInfo) => {
      const roomName = messageInfo.currentRoom;
      messageInfo.date = new Date();
      io.to(roomName).emit(`${roomName}-message`, {...messageInfo})
    })
  })
}

serverStartup();
