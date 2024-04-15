import { expect } from 'chai';
import sinon from 'sinon';
import { createUser, validateUser, updateUser } from '../../src/controllers';
import { User, Message } from '../../src/models';
import CustomError from '../../src/utility/error';
import { hashpwd, checkpwd } from '../../src/auth';

/**
 * This is the test case for the user controller
 */


describe('User Controller Tests', () => {
  describe('POST /api/user/signup', () => {
    it('should create a new user', async () => {
      const req = { body: { username: 'testuser', email: 'test@test.com', password: 'testpassword' } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User.prototype, 'save').resolves();

      await createUser(req, res);

      expect(User.findOne.calledOnce).to.be.true;
      expect(User.prototype.save.calledOnce).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith('User created')).to.be.true;

      User.findOne.restore();
      User.prototype.save.restore();
    });
  });

  describe('POST /api/user/login', () => {
    it('should login a user with valid credentials', async () => {
      const req = { body: { username: 'testuser', password: 'testpassword' }, session: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
      const user = { _id: 'userId', username: 'testuser', password: 'hashedPassword', color: 'red', rooms: [] };

      sinon.stub(User, 'findOne').resolves(user);
      sinon.stub(checkpwd, 'resolves').resolves(true);

      await validateUser(req, res);

      expect(User.findOne.calledOnce).to.be.true;
      expect(checkpwd.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledOnce).to.be.true;

      User.findOne.restore();
      checkpwd.restore();
    });
  });

  describe('POST /api/user/update', () => {
    it('should update user data fields', async () => {
      const req = { body: { uid: 'userId', fields: { newname: 'newusername', oldname: 'oldusername' } } };
      const res = { sendStatus: sinon.spy() };

      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User.prototype, 'save').resolves();
      sinon.stub(Message, 'updateMany').resolves();
      sinon.stub(User, 'findByIdAndUpdate').resolves();

      await updateUser(req, res);

      expect(User.findOne.calledOnce).to.be.true;
      expect(User.prototype.save.calledOnce).to.be.true;
      expect(Message.updateMany.calledOnce).to.be.true;
      expect(User.findByIdAndUpdate.calledOnce).to.be.true;
      expect(res.sendStatus.calledWith(204)).to.be.true;

      User.findOne.restore();
      User.prototype.save.restore();
      Message.updateMany.restore();
      User.findByIdAndUpdate.restore();
    });
  });
});
