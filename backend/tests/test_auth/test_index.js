import { expect } from 'chai';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { hashpwd, checkpwd, generateSecretKey } from '../../src/auth';

/**
 * test case for the auth module
 */

describe('Authentication Functions Tests', () => {
  describe('hashpwd', () => {
    it('should hash a plaintext password', async () => {
      const plainTextPassword = 'password123';
      const hashedPassword = await hashpwd(plainTextPassword);
      const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
      expect(isMatch).to.be.true;
    });
  });

  describe('checkpwd', () => {
    it('should validate a plaintext password against a hash', async () => {
      const plainTextPassword = 'password123';
      const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
      const isValid = await checkpwd(plainTextPassword, hashedPassword);
      expect(isValid).to.be.true;
    });
  });

  describe('generateSecretKey', () => {
    it('should generate a secret key of specified length', () => {
      const length = 16;
      const secretKey = generateSecretKey(length);
      expect(secretKey).to.have.lengthOf(length * 2); // Because it's a hexadecimal string
    });

    it('should generate a secret key of default length if length not provided', () => {
      const defaultLength = 16;
      const secretKey = generateSecretKey();
      expect(secretKey).to.have.lengthOf(defaultLength * 2); // Because it's a hexadecimal string
    });
  });
});
