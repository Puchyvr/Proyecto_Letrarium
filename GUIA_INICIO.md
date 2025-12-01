# 🚀 Guía de Inicio Rápido - Letrarium

## 📋 Pasos para Iniciar el Proyecto

### 1️⃣ Instalar Dependencias

Abre una terminal en la carpeta raíz del proyecto (`Back-End`) y ejecuta:

```bash
npm run install:all
```

Este comando instalará todas las dependencias necesarias para:
- El proyecto raíz
- El backend
- El frontend

**O si prefieres hacerlo manualmente:**

```bash
# Instalar dependencias del proyecto raíz
npm install

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../FrontEnd
npm install
```

### 2️⃣ Configurar Variables de Entorno

El archivo `.env` ya está creado en `backend/.env` con la configuración básica.

**Si necesitas modificarlo**, edita `Back-End/backend/.env`:

```env
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=tu_secret_key_super_segura_cambiar_en_produccion_2024
JWT_EXPIRES_IN=7d
SUPER_ADMIN_EMAIL=admin@letrarium.com
SUPER_ADMIN_PASSWORD=admin123
```

### 3️⃣ Iniciar el Proyecto

#### **Opción 1: Iniciar ambos servidores a la vez (Recomendado)** ⭐

Desde la carpeta raíz (`Back-End`):

```bash
npm run dev
```

Esto iniciará:
- ✅ Backend en http://localhost:4000
- ✅ Frontend en http://localhost:5173

#### **Opción 2: Iniciar por separado**

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

### 4️⃣ Acceder a la Aplicación

Una vez iniciados los servidores:

1. **Frontend:** Abre tu navegador en http://localhost:5173
2. **Backend API:** Disponible en http://localhost:4000

### 5️⃣ Iniciar Sesión como Administrador

Al iniciar el servidor, se crea automáticamente un **Super Admin**:

- **Email:** `admin@letrarium.com`
- **Password:** `admin123`

**Pasos:**
1. En el frontend, haz clic en "Iniciar Sesión"
2. Ingresa las credenciales del super admin
3. Verás un botón "Admin" en el encabezado
4. Haz clic para acceder al panel de administración de productos

## 🔧 Comandos Útiles

### Instalar dependencias
```bash
npm run install:all
```

### Iniciar ambos servidores
```bash
npm run dev
```

### Iniciar solo backend
```bash
npm run dev:backend
```

### Iniciar solo frontend
```bash
npm run dev:frontend
```

### Ejecutar seed (poblar base de datos con datos de ejemplo)
```bash
cd backend
npm run seed
```

## 📡 Puertos

- **Backend:** http://localhost:4000
- **Frontend:** http://localhost:5173

## ⚠️ Solución de Problemas

### Error: "Cannot find module"
**Solución:** Ejecuta `npm run install:all` para instalar todas las dependencias.

### Error: "Port 4000 already in use"
**Solución:** Cierra otros procesos que estén usando el puerto 4000, o cambia el puerto en `backend/.env`.

### Error: "Port 5173 already in use"
**Solución:** Cierra otros procesos que estén usando el puerto 5173, o el frontend usará otro puerto automáticamente.

### La base de datos se corrompe
**Solución:** Elimina el archivo `backend/data/database.sqlite` y reinicia el servidor. Se creará automáticamente.

### No puedo iniciar sesión como admin
**Solución:** Verifica que el servidor backend esté corriendo. El super admin se crea automáticamente al iniciar el servidor.

## 📝 Notas Importantes

- ✅ La base de datos SQLite se crea automáticamente al iniciar el backend
- ✅ El super admin se crea automáticamente si no existe
- ✅ No necesitas eliminar la base de datos cada vez que inicias el servidor
- ✅ El proxy de Vite permite hacer peticiones al backend sin problemas de CORS

## 🎯 Próximos Pasos

1. Inicia el proyecto con `npm run dev`
2. Abre http://localhost:5173 en tu navegador
3. Inicia sesión como admin: `admin@letrarium.com` / `admin123`
4. Accede al panel de administración para gestionar productos

¡Listo! 🎉

