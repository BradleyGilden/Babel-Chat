import { expect } from 'chai';
import sinon from 'sinon';
import { nanoid } from 'nanoid';
import { joinRoom, roomMessage, ghostJoin, leaveRoom, notificationMessage } from '../../src/socketEvents/roomControllers';
import * as helpers from '../../src/socketEvents/helpers';

describe('Socket Handlers Tests', () => {
  describe('joinRoom', () => {
    it('should join the room and emit room status to the client', () => {
      const io = { sockets: { adapter: { rooms: new Map([['roomName', new Set(['socket1', 'socket2'])]]) } }, to: sinon.stub().returnsThis(), emit: sinon.spy() };
      const socket = { join: sinon.spy(), id: 'socket1' };
      const roomInfo = { currentRoom: 'roomName' };

      joinRoom(io, socket)(roomInfo);

      expect(socket.join.calledWith('roomName')).to.be.true;
      expect(io.to.calledWith('roomName')).to.be.true;
      expect(io.emit.calledWith('roomName-status', sinon.match({ socketId: 'socket1', numClients: 2, system: true }))).to.be.true;
    });
  });

  describe('ghostJoin', () => {
    it('should join the room without emitting room status to the client', () => {
      const socket = { join: sinon.spy() };
      const roomInfo = { currentRoom: 'roomName' };

      ghostJoin(socket)(roomInfo);

      expect(socket.join.calledWith('roomName')).to.be.true;
    });
  });

  describe('roomMessage', () => {
    it('should emit the message to the room namespace', () => {
      const io = { of: sinon.stub().returnsThis(), emit: sinon.spy() };
      const messageInfo = { namespace: '/namespace', currentRoom: 'roomName' };

      roomMessage(io)(messageInfo);

      expect(io.of.calledWith('/namespace')).to.be.true;
      expect(io.emit.calledWith('roomName-message', sinon.match(messageInfo))).to.be.true;
    });
  });

  describe('notificationMessage', () => {
    it('should emit the notification to the notify namespace', () => {
      const io = { of: sinon.stub().returnsThis(), emit: sinon.spy() };
      const notification = { username: 'user', message: 'Notification message' };

      notificationMessage(io)(notification);

      expect(io.of.calledWith('/notify')).to.be.true;
      expect(io.emit.calledWith('user-notifications', sinon.match(notification))).to.be.true;
    });
  });

  describe('leaveRoom', () => {
    it('should make the socket leave the room', () => {
      const socket = { leave: sinon.spy() };

      leaveRoom(socket)('roomName');

      expect(socket.leave.calledWith('roomName')).to.be.true;
    });
  });
});
