import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../../src/index';
import { getNotifications, getTranslation, postUpdateTranslation } from '../../src/controllers/messages';

/**
 * This is the test case for the message controller
 */

chai.use(chaiHttp);

describe('Notification API Tests', () => {
  describe('GET /api/notifications', () => {
    it('should return an array of notifications', async () => {
      const req = { query: { username: 'testUser' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await getNotifications(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.be.an('array');
    });
  });

  describe('GET /api/translate', () => {
    it('should return a translation', async () => {
      const req = { query: { text: 'Hello', code: 'fr' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await getTranslation(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('translation');
    });
  });

  describe('POST /api/translate/save', () => {
    it('should update translation in a message', async () => {
      const req = { body: { nanoId: 'someNanoId', translation: 'Bonjour' } };
      const res = {
        sendStatus: sinon.spy()
      };

      await postUpdateTranslation(req, res);

      expect(res.sendStatus.calledWith(200)).to.be.true;
    });
  });
});
