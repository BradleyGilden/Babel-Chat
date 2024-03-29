import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { serverCheck, dbCheck } from '../../src/controllers';

/**
 * This is the test case for the service controller
 */


describe('Server and Database Check Controller Tests', () => {
  describe('GET /serverCheck', () => {
    it('should return status 200 with message "Backend service operational"', async () => {
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      await serverCheck(null, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith('Backend service operational')).to.be.true;
    });
  });

  describe('GET /dbCheck', () => {
    it('should return the status of MongoDB connection', async () => {
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
      const connectionStates = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting', 'Database connection unitialized'];

      mongoose.connection.readyState = 0;
      await dbCheck(null, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(connectionStates[0])).to.be.true;

      mongoose.connection.readyState = 1;
      await dbCheck(null, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(connectionStates[1])).to.be.true;

      mongoose.connection.readyState = 2;
      await dbCheck(null, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(connectionStates[2])).to.be.true;

      mongoose.connection.readyState = 3;
      await dbCheck(null, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(connectionStates[3])).to.be.true;

      mongoose.connection.readyState = 10; // Unknown state
      await dbCheck(null, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(connectionStates[4])).to.be.true;
    });
  });
});
