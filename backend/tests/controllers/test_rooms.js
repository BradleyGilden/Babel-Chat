import { expect } from 'chai';
import sinon from 'sinon';
import { Types } from 'mongoose';
import { getRooms, deleteRooms, createRoomsGlobal, createRoomsPrivate, joinRoomsPrivate, getRoomsPrivate, deleteRoomsPrivate } from '../path/to/your/controllers';
import { Room, Message, User } from '../../src/models/room';
import CustomError from '../../src/utility/error';

/**
 * This is the test case for the rooms controller
 */


describe('Room Controller Tests', () => {
  describe('GET /api/rooms', () => {
    it('should return a list of global rooms', async () => {
      const req = { query: { namespace: '/' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      sinon.stub(Room, 'find').resolves([{ _id: 'someId', name: 'Room1', messages: [] }]);

      await getRooms(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.be.an('array');
      expect(res.json.firstCall.args[0][0]).to.have.property('id');
      expect(res.json.firstCall.args[0][0]).to.have.property('name');
      expect(res.json.firstCall.args[0][0]).to.have.property('messages');
      
      Room.find.restore();
    });
  });

  describe('DELETE /api/rooms', () => {
    it('should delete a global room and its messages', async () => {
      const req = { body: { roomId: 'roomId', username: 'user', roomName: 'Room1' } };
      const res = { sendStatus: sinon.spy() };

      sinon.stub(Room, 'deleteOne').resolves();
      sinon.stub(Message, 'deleteMany').resolves();

      await deleteRooms(req, res);

      expect(Room.deleteOne.calledOnce).to.be.true;
      expect(Message.deleteMany.calledOnce).to.be.true;
      expect(res.sendStatus.calledWith(204)).to.be.true;

      Room.deleteOne.restore();
      Message.deleteMany.restore();
    });
  });

  describe('POST /api/rooms', () => {
    it('should create a global room', async () => {
      const req = { body: { roomName: 'Room1' } };
      const res = { sendStatus: sinon.spy() };

      sinon.stub(Room.prototype, 'save').resolves();

      await createRoomsGlobal(req, res);

      expect(Room.prototype.save.calledOnce).to.be.true;
      expect(res.sendStatus.calledWith(201)).to.be.true;

      Room.prototype.save.restore();
    });
  });

  describe('POST /api/rooms/private', () => {
    it('should create a private room and add it to the user', async () => {
      const req = { body: { roomName: 'Room1', userId: 'userId', passcode: '123456' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      sinon.stub(Room.prototype, 'save').resolves();
      sinon.stub(User, 'findById').resolves({ save: sinon.spy() });

      await createRoomsPrivate(req, res);

      expect(Room.prototype.save.calledOnce).to.be.true;
      expect(User.findById.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      Room.prototype.save.restore();
      User.findById.restore();
    });
  });

  describe('POST /api/rooms/private/join', () => {
    it('should join a private room if passcode is correct', async () => {
      const req = { body: { roomName: 'Room1', passcode: '123456', userId: 'userId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      sinon.stub(Room, 'findOne').resolves({ ownerId: 'userId', messages: [] });
      sinon.stub(User, 'findByIdAndUpdate').resolves();

      await joinRoomsPrivate(req, res);

      expect(Room.findOne.calledOnce).to.be.true;
      expect(User.findByIdAndUpdate.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      Room.findOne.restore();
      User.findByIdAndUpdate.restore();
    });
  });

  describe('GET /api/rooms/private', () => {
    it('should return a list of private rooms belonging to a user', async () => {
      const req = { query: { userId: 'userId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      sinon.stub(User, 'findById').resolves({ rooms: [{ _id: 'roomId', name: 'Room1', messages: [], passcode: '123456', ownerId: 'userId' }] });

      await getRoomsPrivate(req, res);

      expect(User.findById.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      User.findById.restore();
    });
  });

  describe('DELETE /api/rooms/private', () => {
    it('should delete a private room and its messages for owner and members', async () => {
      const req = { body: { roomId: 'roomId', userId: 'userId', roomName: 'Room1' } };
      const res = { sendStatus: sinon.spy() };

      sinon.stub(Room, 'findById').resolves({ ownerId: 'userId' });
      sinon.stub(Room.prototype, 'deleteOne').resolves();
      sinon.stub(Message, 'deleteMany').resolves();
      sinon.stub(User, 'findById').resolves({ rooms: [{ _id: 'roomId' }], save: sinon.spy() });

      await deleteRoomsPrivate(req, res);

      expect(Room.findById.calledOnce).to.be.true;
      expect(Room.prototype.deleteOne.calledOnce).to.be.true;
      expect(Message.deleteMany.calledOnce).to.be.true;
      expect(User.findById.calledOnce).to.be.true;
      expect(res.sendStatus.calledWith(204)).to.be.true;

      Room.findById.restore();
      Room.prototype.deleteOne.restore();
      Message.deleteMany.restore();
      User.findById.restore();
    });
  });
});
