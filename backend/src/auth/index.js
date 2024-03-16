/**
 * handles authentication of a users log in
 */
import bcrypt from 'bcrypt';

/**
 * hashes a plaintext password using bcrypt's hash method with 10 satl rounds
 * @param {string} plainTextPassword plain text password
 * @return {string} a salted hash
 */
const hashpwd = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, 10);
}

/**
 * validates a plaintext password against a salted hash
 * @param {string} plainTextPassword plain text password
 * @param {string} hash a salted hash
 * @return {boolean} true if password matches, false otherwise
 */
const checkpwd = (plainTextPassword, hash) => {
  return bcrypt.compare(plainTextPassword, hash);
}

export {
  checkpwd,
  hashpwd,
}
