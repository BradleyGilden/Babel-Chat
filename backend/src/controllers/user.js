import { Types } from 'mongoose';
import asyncWrapper from '../middleware/asyncWrapper';
import { User, Message } from '../models';
import CustomError from '../utility/error';
import { hashpwd, checkpwd } from '../auth';

const createUser = asyncWrapper(async (req, res) => {
  // get values from request body, whether urlencoded or json
  const { username, email, password } = req.body;
  const replica = await User.findOne({
    $or: [
      { username },
      { email },
    ]
  }).exec();
  if (replica) {
    throw new CustomError("Username or email is taken", 401);
  }
  // hashes users password
  const hashed_pwd = await hashpwd(password);
  const user = new User({ username, email, password: hashed_pwd });
  await user.save();
  res.status(201).send(`User created`);
});

const validateUser = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw new CustomError(`Invalid Credentials: Username '${username}' does not Exist`, 401);
  }
  const isValid = await checkpwd(password, user.password);
  if (!isValid) {
    throw new CustomError(`Invalid Credentials: Username '${username}' does not match password`, 401);
  }

  const userObj = {
    id: String(user._id),
    username: user.username,
    color: user.color,
    rooms: user.rooms
  }

  req.session.user = userObj;
  req.session.user.id = user._id;

  res.status(200).json(userObj);
});

const updateUser = asyncWrapper(async (req, res) => {
  const { uid, fields } = req.body;

  if (fields.newname) {
    const user = await User.findOne({ username: fields.newname }).exec();

    if (user) throw new CustomError('Username is taken', 401);

    await Message.updateMany({ username: fields.oldname }, { username: fields.newname }).exec();
    fields.username = fields.newname;
    delete fields.newname;
    delete fields.oldname;
    if (fields.password) fields.password = hashpwd(fields.password);
    await User.findByIdAndUpdate(new Types.ObjectId(uid), {...fields}).exec();
  } else {
    await User.findByIdAndUpdate(new Types.ObjectId(uid), { password: hashpwd(fields.password) }).exec();
  }

  res.sendStatus(204)
});

const logoutUser = asyncWrapper(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new CustomError('Error logging out', 500);
    } else {
      res.sendStatus(204);
    }
  });
});

export {
  createUser,
  validateUser,
  updateUser,
  logoutUser,
};
