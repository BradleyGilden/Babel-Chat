import {
  joinRoom,
  roomMessage,
  ghostJoin,
  leaveRoom,
  notificationMessage,
} from "./roomControllers";

const socketInit = (io) => {
  io.on("connection", (socket) => {
    socket.on("join room", joinRoom(io, socket));

    socket.on("ghost join", ghostJoin(socket));

    socket.on("leave room", leaveRoom(socket));

    socket.on("room message", roomMessage(io));
  });

  io.of("/private").on("connection", (socket) => {
    socket.on("ghost join", ghostJoin(socket));

    socket.on("leave room", leaveRoom(socket));

    socket.on("room message", roomMessage(io));
  });

  io.of("/notify").on("connection", (socket) => {
    socket.on("send notification", notificationMessage(io));
  });
};

export default socketInit;
