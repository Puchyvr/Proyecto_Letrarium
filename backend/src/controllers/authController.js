const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { signToken } = require('../utils/jwt');
const User = require('../models/User');
const { sendMail } = require('../services/emailService');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = signToken({ id: user.id, role: user.role });
    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    // Manejar errores de validación de Sequelize
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: err.errors[0]?.message || 'Validation error' });
    }
    return res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken({ id: user.id, role: user.role });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function me(req, res) {
  const u = req.user;
  return res.json({ id: u.id, name: u.name, email: u.email, role: u.role });
}

async function updateMe(req, res) {
  try {
    const { name, email, password } = req.body;
    if (name) req.user.name = name;
    if (email) {
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      req.user.email = email;
    }
    if (password) req.user.passwordHash = await bcrypt.hash(password, 10);
    await req.user.save();
    return res.json({ id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: err.errors[0]?.message || 'Validation error' });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    return res.status(500).json({ message: err.message });
  }
}

async function forgot(req, res) {
  try {
    const { email } = req.body;
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    const user = await User.findOne({ where: { email } });
    // Por seguridad, siempre devolvemos el mismo mensaje
    if (!user) {
      return res.status(200).json({ message: 'Si el correo existe, se envió un enlace de recuperación' });
    }
    
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos
    user.resetToken = token;
    user.resetTokenExpiresAt = expires;
    await user.save();
    
    const link = `${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}/reset-password?token=${token}`;
    const { templates } = require('../services/emailService');
    const html = templates.resetPasswordTemplate({ link, userName: user.name });
    
    try {
      await sendMail({ 
        to: email, 
        subject: 'Letrarium - Recuperación de Contraseña', 
        html 
      });
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      // Si no hay configuración de email, aún devolvemos éxito pero con advertencia
      if (!process.env.EMAIL_HOST) {
        console.warn('⚠️  EMAIL no configurado. El enlace de recuperación no se envió por email.');
        console.warn(`   Token de recuperación: ${token}`);
        console.warn(`   Enlace: ${link}`);
      }
    }
    
    return res.status(200).json({ message: 'Si el correo existe, se envió un enlace de recuperación' });
  } catch (err) {
    console.error('Error en forgot password:', err);
    return res.status(500).json({ message: err.message });
  }
}

async function reset(req, res) {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });
    if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiresAt = null;
    await user.save();
    return res.json({ message: 'Password updated' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login, me, updateMe, forgot, reset };


