import { joinRoom, roomMessage, ghostJoin } from './roomControllers';

const socketInit = (io) => {
  io.on('connection', (socket) => {

    socket.on('join room', joinRoom(io, socket))

    socket.on('ghost join', ghostJoin(socket))

    socket.on('room message', roomMessage(io))
  })
}

export default socketInit;
