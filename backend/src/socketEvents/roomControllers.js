import { nanoid } from "nanoid";
import { updateMessage, updateNotification } from "./helpers";

const joinRoom = (io, socket) => {
  return (roomInfo) => {
    const roomName = roomInfo.currentRoom; // the sockets current room
    socket.join(roomName);
    console.log("joined room", roomInfo);
    // gets number of clients in each room
    const room = io.sockets.adapter.rooms.get(roomInfo.currentRoom);
    const numClientsInRoom = room ? room.size : 0;

    // establishes a date for time the message was sent
    roomInfo.date = new Date();
    // creating a nanoid for the message
    roomInfo.nanoId = nanoid();
    io.to(roomName).emit(`${roomName}-status`, {
      socketId: socket.id,
      numClients: numClientsInRoom,
      system: true,
      ...roomInfo,
    });
  };
};

const ghostJoin = (socket) => {
  return (roomInfo) => {
    console.log("ghost join", roomInfo);
    const roomName = roomInfo.currentRoom;
    socket.join(roomName);
  };
};

const roomMessage = (io) => {
  return (messageInfo) => {
    console.log(messageInfo);

    const namespace = messageInfo.namespace;
    delete messageInfo.namespace;

    const roomName = messageInfo.currentRoom;
    messageInfo.date = new Date();
    messageInfo.nanoId = nanoid();
    updateMessage(messageInfo);
    io.of(namespace || "/")
      .to(roomName)
      .emit(`${roomName}-message`, messageInfo);
  };
};

const notificationMessage = (io) => {
  return (notification) => {
    notification.date = new Date();
    notification.nanoId = nanoid();
    console.log(notification);
    updateNotification(notification);
    const { username } = notification;
    io.of("/notify").emit(`${username}-notifications`, notification);
  };
};

const leaveRoom = (socket) => {
  return (roomName) => {
    socket.leave(roomName);
  };
};

export { joinRoom, roomMessage, ghostJoin, leaveRoom, notificationMessage };
