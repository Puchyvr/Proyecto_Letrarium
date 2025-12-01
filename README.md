# Letrarium - Aplicación Fullstack

Este proyecto contiene tanto el backend como el frontend de la aplicación Letrarium.

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
# Instalar dependencias de todos los proyectos
npm run install:all
```

O manualmente:
```bash
npm install
cd backend && npm install
cd ../FrontEnd && npm install
```

### 2. Configurar variables de entorno

En la carpeta `backend`, crea un archivo `.env` con el siguiente contenido:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# CORS Configuration
CLIENT_ORIGIN=http://localhost:5173

# JWT Configuration
JWT_SECRET=tu_secret_key_super_segura_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# Email Configuration (opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password
EMAIL_FROM=tu_email@gmail.com
```

**⚠️ Importante:** Cambia `JWT_SECRET` por una clave secreta segura en producción.

### 3. Iniciar los servidores

#### Opción 1: Iniciar ambos servidores a la vez (recomendado)
```bash
npm run dev
```

#### Opción 2: Iniciar por separado

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

## 📡 Puertos

- **Backend:** http://localhost:4000
- **Frontend:** http://localhost:5173

## 🔧 Configuración

### Backend
- El backend está configurado para aceptar peticiones desde `http://localhost:5173` (CORS)
- La base de datos SQLite se crea automáticamente en `backend/data/database.sqlite`

### Frontend
- El frontend está configurado con un proxy que redirige todas las peticiones `/api/*` al backend
- Puedes usar el helper `api` desde `src/config/api.js` para hacer peticiones

### Ejemplo de uso de la API en el frontend:

```javascript
import { api } from './config/api';

// GET request
const products = await api.get('/api/products');

// POST request
const user = await api.post('/api/auth/register', {
  name: 'Juan',
  email: 'juan@example.com',
  password: 'password123'
});
```

## 📁 Estructura del Proyecto

```
.
├── backend/          # API REST con Express y Sequelize
│   ├── src/
│   │   ├── config/   # Configuración (DB, etc.)
│   │   ├── models/   # Modelos de Sequelize
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── services/
│   └── data/         # Base de datos SQLite
└── FrontEnd/         # Frontend con React y Vite
    └── src/
        ├── Components/
        └── config/    # Configuración de API
```

## 🛠️ Tecnologías

### Backend
- Node.js + Express
- Sequelize (ORM)
- SQLite
- JWT para autenticación

### Frontend
- React 19
- Vite
- React Icons

## 📝 Notas

- La base de datos se crea automáticamente al iniciar el backend
- El proxy de Vite permite hacer peticiones al backend sin problemas de CORS durante el desarrollo
- En producción, asegúrate de configurar correctamente las variables de entorno

