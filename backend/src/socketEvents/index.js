import { joinRoom, roomMessage, ghostJoin, leaveRoom } from './roomControllers';

const socketInit = (io) => {
  io.on('connection', (socket) => {

    socket.on('join room', joinRoom(io, socket));

    socket.on('ghost join', ghostJoin(socket));

    socket.on('leave room', leaveRoom(socket));

    socket.on('room message', roomMessage(io));
  })
}

export default socketInit;
