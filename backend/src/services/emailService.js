const nodemailer = require('nodemailer');

// Solo crear transporter si hay configuración de email
let transporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  console.warn('⚠️  EMAIL no configurado. Las funciones de email no estarán disponibles.');
  console.warn('   Para habilitar el envío de emails, configura EMAIL_HOST, EMAIL_USER y EMAIL_PASS en .env');
}

async function sendMail({ to, subject, html, text }) {
  if (!transporter) {
    throw new Error('Email service not configured. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in .env');
  }
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  return transporter.sendMail({ from, to, subject, html, text });
}

// Basic templates
function purchaseConfirmationTemplate({ orderId, total }) {
  return `<h1>Gracias por tu compra</h1><p>Pedido #${orderId}</p><p>Total: $${total}</p>`;
}

function resetPasswordTemplate({ link, userName = 'Usuario' }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background-color: #f9f9f9; padding: 30px; border: 1px solid #ddd; }
        .button { display: inline-block; padding: 12px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .warning { color: #d32f2f; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Letrarium - Recuperación de Contraseña</h1>
        </div>
        <div class="content">
          <p>Hola ${userName},</p>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Letrarium.</p>
          <p>Para crear una nueva contraseña, haz clic en el siguiente botón:</p>
          <div style="text-align: center;">
            <a href="${link}" class="button">Restablecer Contraseña</a>
          </div>
          <p>O copia y pega este enlace en tu navegador:</p>
          <p style="word-break: break-all; color: #007bff;">${link}</p>
          <p class="warning">
            <strong>⚠️ Importante:</strong> Este enlace expirará en 30 minutos por seguridad.
            Si no solicitaste este cambio, puedes ignorar este correo.
          </p>
        </div>
        <div class="footer">
          <p>Este es un correo automático, por favor no respondas.</p>
          <p>&copy; ${new Date().getFullYear()} Letrarium. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

module.exports = { 
  sendMail,
  templates: { purchaseConfirmationTemplate, resetPasswordTemplate }
};


