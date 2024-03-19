/**
 * handles authentication of a users log in
 */
import bcrypt from 'bcrypt';
import crypto from 'crypto';

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

/**
 * randomly generates a seceret key using the crypto module
 * @param {number} length [length=16] length of the secret key
 * @returns {string} a random hexidecimal string
 */
const generateSecretKey = (length = 16) => {
  return crypto.randomBytes(length).toString('hex');
}


export {
  checkpwd,
  hashpwd,
  generateSecretKey,
}
