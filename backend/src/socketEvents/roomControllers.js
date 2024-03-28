import { nanoid } from "nanoid";
import { updateMessage, updateNotification } from "./helpers";

/**
 * Wrapper method for socket handler designed to activate once a client
 * joins a public room
 * 
 * @param {socketio} io socketio server instance
 * @param {io} socket socket representing client instance
 * @returns {callback} taking room information as a parameter
 */

const joinRoom = (io, socket) => {
  return (roomInfo) => {
    const roomName = roomInfo.currentRoom; // the sockets current room
    socket.join(roomName);
    // gets number of clients in each room
    const room = io.sockets.adapter.rooms.get(roomInfo.currentRoom);
    const numClientsInRoom = room ? room.size : 0;

    // establishes a date for time the message was sent
    roomInfo.date = new Date();
    // creating a nanoid for the message
    roomInfo.nanoId = nanoid();
    // emit room info to the client
    io.to(roomName).emit(`${roomName}-status`, {
      socketId: socket.id,
      numClients: numClientsInRoom,
      system: true,
      ...roomInfo,
    });
  };
};

/**
 * Wrapper method for socket handler similar to joinRoom, however it does
 * not notify the client
 * 
 * @param {io} socket socket representing client instance
 * @returns {callback} taking room information as a parameter
 */

const ghostJoin = (socket) => {
  return (roomInfo) => {
    const roomName = roomInfo.currentRoom;
    socket.join(roomName);
  };
};

/**
 * Wrapper method for socket handler that controlls incoming and outgoing
 * private and public messages
 * 
 * @param {socketio} io socketio server instance
 * @returns {callback} taking message information as a parameter
 */

const roomMessage = (io) => {
  return (messageInfo) => {

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

/**
 * Wrapper method for socket handler that controlls outgoing notifications
 * 
 * @param {socketio} io socketio server instance
 * @returns {callback} taking notification information as a parameter
 */

const notificationMessage = (io) => {
  return (notification) => {
    notification.date = new Date();
    notification.nanoId = nanoid();
    updateNotification(notification);
    const { username } = notification;
    io.of("/notify").emit(`${username}-notifications`, notification);
  };
};

/**
 * Wrapper method for socket handler that detaches client from room
 * 
 * @param {socketio} io socketio server instance
 * @returns {callback} taking room information as a parameter
 */

const leaveRoom = (socket) => {
  return (roomName) => {
    socket.leave(roomName);
  };
};

export { joinRoom, roomMessage, ghostJoin, leaveRoom, notificationMessage };
