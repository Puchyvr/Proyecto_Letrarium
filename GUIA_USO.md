# Guía de Uso - Una vez iniciados los servidores

## 🚀 Acceso a la Aplicación

1. **Frontend**: Abre tu navegador en `http://localhost:5173`
2. **Backend**: El servidor está corriendo en `http://localhost:4000`

## ✅ Verificar que todo funciona

### 1. Verificar Backend
Abre en tu navegador: `http://localhost:4000/health`
- Deberías ver: `{"status":"ok"}`

### 2. Verificar Frontend
Abre en tu navegador: `http://localhost:5173`
- Deberías ver la página principal con:
  - Encabezado con logo
  - Banner
  - Categorías

## 🧪 Probar la API desde el navegador

Abre la **Consola del Navegador** (F12 → Console) y prueba estos comandos:

### Obtener Productos
```javascript
fetch('/api/products')
  .then(res => res.json())
  .then(data => console.log('Productos:', data))
  .catch(err => console.error('Error:', err));
```

### Obtener Categorías
```javascript
fetch('/api/categories')
  .then(res => res.json())
  .then(data => console.log('Categorías:', data))
  .catch(err => console.error('Error:', err));
```

### Registrar un Usuario
```javascript
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    password: 'password123'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('Usuario registrado:', data);
    // Guardar el token
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Token guardado');
    }
  })
  .catch(err => console.error('Error:', err));
```

### Hacer Login
```javascript
fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'juan@ejemplo.com',
    password: 'password123'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('Login exitoso:', data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('Token guardado');
    }
  })
  .catch(err => console.error('Error:', err));
```

### Obtener mi información (requiere estar logueado)
```javascript
const token = localStorage.getItem('token');
fetch('/api/users/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log('Mi información:', data))
  .catch(err => console.error('Error:', err));
```

## 📋 Funcionalidades Disponibles

### 🔐 Autenticación
- ✅ POST `/api/auth/register` - Registrar usuario
- ✅ POST `/api/auth/login` - Iniciar sesión
- ✅ POST `/api/auth/forgot` - Recuperar contraseña
- ✅ POST `/api/auth/reset` - Restablecer contraseña

### 📦 Productos
- ✅ GET `/api/products` - Listar productos
- ✅ GET `/api/products/:id` - Ver producto específico
- ✅ POST `/api/products` - Crear producto (admin)
- ✅ PUT `/api/products/:id` - Actualizar producto (admin)
- ✅ DELETE `/api/products/:id` - Eliminar producto (admin)

### 📚 Categorías
- ✅ GET `/api/categories` - Listar categorías
- ✅ GET `/api/categories/:id` - Ver categoría específica
- ✅ POST `/api/categories` - Crear categoría (admin)
- ✅ PUT `/api/categories/:id` - Actualizar categoría (admin)
- ✅ DELETE `/api/categories/:id` - Eliminar categoría (admin)

### 🛒 Carrito
- ✅ GET `/api/cart` - Ver mi carrito (requiere login)
- ✅ POST `/api/cart` - Agregar al carrito (requiere login)
- ✅ PUT `/api/cart/:id` - Actualizar item del carrito (requiere login)
- ✅ DELETE `/api/cart/:id` - Eliminar item del carrito (requiere login)
- ✅ DELETE `/api/cart` - Limpiar carrito (requiere login)

### 📝 Órdenes
- ✅ POST `/api/orders` - Crear orden (requiere login)
- ✅ GET `/api/orders` - Listar todas las órdenes (admin)
- ✅ GET `/api/orders/:id` - Ver orden específica (propietario o admin)

## 🎯 Próximos Pasos para Desarrollar

1. **Conectar el Frontend con la API**:
   - Usar las funciones de `FrontEnd/src/utils/apiExample.js`
   - O usar directamente `FrontEnd/src/config/api.js`

2. **Crear componentes para**:
   - Lista de productos
   - Formulario de login/registro
   - Vista del carrito
   - Gestión de productos (admin)

3. **Mejorar la UI**:
   - Agregar estilos a los componentes
   - Hacer la aplicación responsive
   - Agregar manejo de estados de carga y errores

## 🔍 Verificar Comunicación Frontend-Backend

1. Abre las **Herramientas de Desarrollador** (F12)
2. Ve a la pestaña **Network** (Red)
3. Recarga la página
4. Deberías ver peticiones a `/api/...` si el frontend está haciendo llamadas

## ⚠️ Notas Importantes

- El backend usa SQLite, la base de datos se crea automáticamente en `backend/data/database.sqlite`
- Para crear un usuario admin, necesitarás modificar directamente la base de datos o agregar una ruta especial
- El token JWT se guarda en `localStorage` del navegador
- Las rutas protegidas requieren el header `Authorization: Bearer <token>`

