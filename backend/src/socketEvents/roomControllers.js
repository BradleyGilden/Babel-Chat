const joinRoom = (io, socket) => {
  return (roomInfo) => {
    const roomName = roomInfo.currentRoom; // the sockets current room
    socket.join(roomName);
    console.log('joined room', roomInfo)
  
    // gets number of clients in each room
    const room = io.sockets.adapter.rooms.get(roomInfo.currentRoom);
    const numClientsInRoom = room ? room.size : 0;
  
    // establishes a date for time the message was sent
    roomInfo.date = new Date();
    io.to(roomName).emit(`${roomName}-status`, { socketId: socket.id, numClients: numClientsInRoom, ...roomInfo})
  }
};

const roomMessage = (io) => {
  return  (messageInfo) => {
    const roomName = messageInfo.currentRoom;
    messageInfo.date = new Date();
    io.to(roomName).emit(`${roomName}-message`, {...messageInfo})
  }
};

export {
  joinRoom,
  roomMessage,
}
