import { expect } from 'chai';
import sinon from 'sinon';
import { Types } from 'mongoose';
import { updateMessage, updateNotification } from '../../src/socketEvents/helpers';
import { Room, Message } from '../../src/models';

/**
 * test case for socket helpers
 */

describe('Update Functions Tests', () => {
  describe('updateMessage', () => {
    it('should save a message and update the room with its reference id', async () => {
      const messageObj = { roomId: 'roomId', text: 'Test message' };
      const savedMessage = { _id: 'messageId' };

      sinon.stub(Message.prototype, 'save').resolves(savedMessage);
      sinon.stub(Room, 'findByIdAndUpdate').resolves();

      await updateMessage(messageObj);

      expect(Message.prototype.save.calledOnce).to.be.true;
      expect(Room.findByIdAndUpdate.calledOnceWithExactly(new Types.ObjectId('roomId'), { $push: { messages: 'messageId' } })).to.be.true;

      Message.prototype.save.restore();
      Room.findByIdAndUpdate.restore();
    });

    it('should handle errors if saving message fails', async () => {
      const messageObj = { roomId: 'roomId', text: 'Test message' };
      const error = new Error('Saving message failed');

      sinon.stub(Message.prototype, 'save').rejects(error);
      sinon.stub(console, 'log');

      await updateMessage(messageObj);

      expect(console.log.calledOnceWithExactly(error)).to.be.true;

      Message.prototype.save.restore();
      console.log.restore();
    });

    it('should handle errors if updating room fails', async () => {
      const messageObj = { roomId: 'roomId', text: 'Test message' };
      const savedMessage = { _id: 'messageId' };
      const error = new Error('Updating room failed');

      sinon.stub(Message.prototype, 'save').resolves(savedMessage);
      sinon.stub(Room, 'findByIdAndUpdate').rejects(error);
      sinon.stub(console, 'log');

      await updateMessage(messageObj);

      expect(console.log.calledOnceWithExactly(error)).to.be.true;

      Message.prototype.save.restore();
      Room.findByIdAndUpdate.restore();
      console.log.restore();
    });
  });

  describe('updateNotification', () => {
    it('should save a notification message', async () => {
      const messageObj = { text: 'Notification message' };

      sinon.stub(Message.prototype, 'save').resolves();
      sinon.stub(console, 'log');

      await updateNotification(messageObj);

      expect(Message.prototype.save.calledOnce).to.be.true;
      expect(console.log.notCalled).to.be.true;

      Message.prototype.save.restore();
      console.log.restore();
    });

    it('should handle errors if saving message fails', async () => {
      const messageObj = { text: 'Notification message' };
      const error = new Error('Saving message failed');

      sinon.stub(Message.prototype, 'save').rejects(error);
      sinon.stub(console, 'log');

      await updateNotification(messageObj);

      expect(console.log.calledOnceWithExactly(error)).to.be.true;

      Message.prototype.save.restore();
      console.log.restore();
    });
  });
});
