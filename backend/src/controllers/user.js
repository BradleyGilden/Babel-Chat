import asyncWrapper from '../middleware/asyncWrapper';
import { User } from '../models';
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
  res.status(200).send(`Sign in succcessful. Welcome ${username}`);
});

export {
  createUser,
  validateUser,
};
