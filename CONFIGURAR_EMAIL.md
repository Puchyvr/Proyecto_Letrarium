# 📧 Configuración de Email para Recuperación de Contraseña

## ⚠️ Importante

La funcionalidad de recuperación de contraseña **funciona sin configuración de email**, pero en ese caso el enlace de recuperación se mostrará en la consola del servidor en lugar de enviarse por correo.

## 🔧 Configuración de Email (Opcional pero Recomendado)

Para que los correos de recuperación se envíen automáticamente, necesitas configurar un servicio de email SMTP.

### Opción 1: Gmail (Más Fácil)

1. **Habilita la verificación en 2 pasos** en tu cuenta de Google
2. **Genera una contraseña de aplicación:**
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Ingresa "Letrarium" como nombre
   - Copia la contraseña generada (16 caracteres)

3. **Agrega estas variables a `backend/.env`:**

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicación_de_16_caracteres
EMAIL_FROM=tu_email@gmail.com
```

### Opción 2: Otros Servicios SMTP

Puedes usar cualquier servicio SMTP. Aquí algunos ejemplos:

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=tu_email@outlook.com
EMAIL_PASS=tu_contraseña
EMAIL_FROM=tu_email@outlook.com
```

#### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=tu_api_key_de_sendgrid
EMAIL_FROM=tu_email@tudominio.com
```

#### Mailgun
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=tu_usuario_mailgun
EMAIL_PASS=tu_contraseña_mailgun
EMAIL_FROM=tu_email@tudominio.com
```

## 🧪 Probar la Configuración

1. Inicia el servidor backend
2. Ve al frontend y haz clic en "Iniciar Sesión"
3. Haz clic en "¿Olvidaste tu contraseña?"
4. Ingresa un email válido
5. Revisa tu bandeja de entrada (y spam) para el correo de recuperación

## 🔍 Si el Email No Está Configurado

Si no configuraste el email, el sistema seguirá funcionando pero:

- El enlace de recuperación se mostrará en la **consola del servidor backend**
- Verás un mensaje como:
  ```
  ⚠️  EMAIL no configurado. El enlace de recuperación no se envió por email.
     Token de recuperación: abc123...
     Enlace: http://localhost:5173/reset-password?token=abc123...
  ```

Puedes copiar ese enlace y usarlo manualmente para restablecer la contraseña.

## ✅ Verificar que Funciona

Después de configurar el email:

1. Reinicia el servidor backend
2. Deberías ver en la consola: `✅ Email service configured`
3. Intenta recuperar una contraseña
4. Revisa tu correo (y spam) para el mensaje

## 🛠️ Solución de Problemas

### Error: "Email service not configured"
**Solución:** Verifica que todas las variables de email estén en `backend/.env`

### Error: "Invalid login" o "Authentication failed"
**Solución:** 
- Para Gmail: Usa una contraseña de aplicación, no tu contraseña normal
- Verifica que EMAIL_USER y EMAIL_PASS sean correctos
- Asegúrate de que el puerto sea correcto (587 para TLS)

### No recibo el correo
**Solución:**
- Revisa la carpeta de spam
- Verifica que el email esté correcto
- Revisa la consola del servidor para ver si hay errores
- Verifica que el firewall no bloquee el puerto 587

## 📝 Notas

- El enlace de recuperación expira en **30 minutos**
- Por seguridad, siempre se devuelve el mismo mensaje (aunque el email no exista)
- El template del email es HTML y se ve profesional
- Puedes personalizar el template en `backend/src/services/emailService.js`

