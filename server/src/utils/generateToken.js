import jwt from 'jsonwebtoken';

/**
 * Generate a cryptographically signed JWT Token
 * @param {string} id - User ID
 * @param {string} role - 'admin' | 'staff'
 * @returns {string} - Signed JWT string
 */
export const generateToken = (id, role = 'staff') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'smartstock_secret_key_bca_2025',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export default generateToken;

