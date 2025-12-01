const jwt = require('jsonwebtoken');

function signToken(payload, options = {}) {
  const secret = process.env.JWT_SECRET || 'default_secret_change_in_production';
  const expiresIn = options.expiresIn || process.env.JWT_EXPIRES_IN || '7d';
  if (!secret || secret === 'default_secret_change_in_production') {
    console.warn('⚠️  ADVERTENCIA: JWT_SECRET no configurado. Usando valor por defecto. Cambiar en producción.');
  }
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET || 'default_secret_change_in_production';
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };


