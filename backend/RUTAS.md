# 📡 API Routes - Documentación Completa

Base URL: `http://localhost:4000`

## 🔐 Autenticación

Todas las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

---

## 🟢 Health Check

### GET `/health`
Verifica que el servidor esté funcionando.

**Sin autenticación**

**Ejemplo:**
```bash
GET http://localhost:4000/health
```

**Respuesta:**
```json
{
  "status": "ok"
}
```

---

## 👤 Autenticación (`/api/auth`)

### POST `/api/auth/register`
Registra un nuevo usuario.

**Sin autenticación**

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Ejemplo con fetch:**
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: 'password123'
  })
});
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

---

### POST `/api/auth/login`
Inicia sesión con email y contraseña.

**Sin autenticación**

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Ejemplo:**
```javascript
const response = await api.post('/api/auth/login', {
  email: 'juan@example.com',
  password: 'password123'
});
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

---

### POST `/api/auth/forgot`
Solicita restablecimiento de contraseña.

**Sin autenticación**

**Body:**
```json
{
  "email": "juan@example.com"
}
```

**Ejemplo:**
```javascript
await api.post('/api/auth/forgot', {
  email: 'juan@example.com'
});
```

---

### POST `/api/auth/reset`
Restablece la contraseña con un token.

**Sin autenticación**

**Body:**
```json
{
  "token": "reset_token_recibido_por_email",
  "password": "nueva_password123"
}
```

**Ejemplo:**
```javascript
await api.post('/api/auth/reset', {
  token: 'reset_token_recibido_por_email',
  password: 'nueva_password123'
});
```

---

## 👥 Usuarios (`/api/users`)

### GET `/api/users/me`
Obtiene la información del usuario autenticado.

**🔒 Requiere autenticación**

**Ejemplo:**
```javascript
const user = await api.get('/api/users/me');
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### PUT `/api/users/me`
Actualiza la información del usuario autenticado.

**🔒 Requiere autenticación**

**Body:**
```json
{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}
```

**Ejemplo:**
```javascript
const updated = await api.put('/api/users/me', {
  name: 'Juan Carlos Pérez',
  email: 'juancarlos@example.com'
});
```

---

## 📦 Productos (`/api/products`)

### GET `/api/products`
Obtiene la lista de todos los productos.

**Sin autenticación**

**Ejemplo:**
```javascript
const products = await api.get('/api/products');
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Producto 1",
    "description": "Descripción del producto",
    "price": 29.99,
    "stock": 100,
    "categoryId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET `/api/products/:id`
Obtiene un producto específico por ID.

**Sin autenticación**

**Ejemplo:**
```javascript
const product = await api.get('/api/products/1');
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Producto 1",
  "description": "Descripción del producto",
  "price": 29.99,
  "stock": 100,
  "categoryId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### POST `/api/products`
Crea un nuevo producto.

**🔒 Requiere autenticación + Admin**

**Body:**
```json
{
  "name": "Nuevo Producto",
  "description": "Descripción del nuevo producto",
  "price": 39.99,
  "stock": 50,
  "categoryId": 1
}
```

**Ejemplo:**
```javascript
const newProduct = await api.post('/api/products', {
  name: 'Nuevo Producto',
  description: 'Descripción del nuevo producto',
  price: 39.99,
  stock: 50,
  categoryId: 1
});
```

---

### PUT `/api/products/:id`
Actualiza un producto existente.

**🔒 Requiere autenticación + Admin**

**Body:**
```json
{
  "name": "Producto Actualizado",
  "price": 49.99,
  "stock": 75
}
```

**Ejemplo:**
```javascript
const updated = await api.put('/api/products/1', {
  name: 'Producto Actualizado',
  price: 49.99,
  stock: 75
});
```

---

### DELETE `/api/products/:id`
Elimina un producto.

**🔒 Requiere autenticación + Admin**

**Ejemplo:**
```javascript
await api.delete('/api/products/1');
```

---

## 🏷️ Categorías (`/api/categories`)

### GET `/api/categories`
Obtiene la lista de todas las categorías.

**Sin autenticación**

**Ejemplo:**
```javascript
const categories = await api.get('/api/categories');
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Categoría 1",
    "description": "Descripción de la categoría",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET `/api/categories/:id`
Obtiene una categoría específica por ID.

**Sin autenticación**

**Ejemplo:**
```javascript
const category = await api.get('/api/categories/1');
```

---

### POST `/api/categories`
Crea una nueva categoría.

**🔒 Requiere autenticación + Admin**

**Body:**
```json
{
  "name": "Nueva Categoría",
  "description": "Descripción de la nueva categoría"
}
```

**Ejemplo:**
```javascript
const newCategory = await api.post('/api/categories', {
  name: 'Nueva Categoría',
  description: 'Descripción de la nueva categoría'
});
```

---

### PUT `/api/categories/:id`
Actualiza una categoría existente.

**🔒 Requiere autenticación + Admin**

**Body:**
```json
{
  "name": "Categoría Actualizada",
  "description": "Nueva descripción"
}
```

**Ejemplo:**
```javascript
const updated = await api.put('/api/categories/1', {
  name: 'Categoría Actualizada',
  description: 'Nueva descripción'
});
```

---

### DELETE `/api/categories/:id`
Elimina una categoría.

**🔒 Requiere autenticación + Admin**

**Ejemplo:**
```javascript
await api.delete('/api/categories/1');
```

---

## 🛒 Carrito (`/api/cart`)

### GET `/api/cart`
Obtiene el carrito del usuario autenticado.

**🔒 Requiere autenticación**

**Ejemplo:**
```javascript
const cart = await api.get('/api/cart');
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2,
    "product": {
      "id": 1,
      "name": "Producto 1",
      "price": 29.99
    }
  }
]
```

---

### POST `/api/cart`
Añade un producto al carrito.

**🔒 Requiere autenticación**

**Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Ejemplo:**
```javascript
const cartItem = await api.post('/api/cart', {
  productId: 1,
  quantity: 2
});
```

---

### PUT `/api/cart/:id`
Actualiza la cantidad de un item en el carrito.

**🔒 Requiere autenticación**

**Body:**
```json
{
  "quantity": 5
}
```

**Ejemplo:**
```javascript
const updated = await api.put('/api/cart/1', {
  quantity: 5
});
```

---

### DELETE `/api/cart/:id`
Elimina un item específico del carrito.

**🔒 Requiere autenticación**

**Ejemplo:**
```javascript
await api.delete('/api/cart/1');
```

---

### DELETE `/api/cart`
Vacía todo el carrito del usuario.

**🔒 Requiere autenticación**

**Ejemplo:**
```javascript
await api.delete('/api/cart');
```

---

## 📋 Órdenes (`/api/orders`)

### POST `/api/orders`
Crea una nueva orden desde el carrito.

**🔒 Requiere autenticación**

**Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "shippingAddress": "Calle Principal 123",
  "paymentMethod": "tarjeta"
}
```

**Ejemplo:**
```javascript
const order = await api.post('/api/orders', {
  items: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 }
  ],
  shippingAddress: 'Calle Principal 123',
  paymentMethod: 'tarjeta'
});
```

---

### GET `/api/orders`
Obtiene todas las órdenes (solo administradores).

**🔒 Requiere autenticación + Admin**

**Ejemplo:**
```javascript
const orders = await api.get('/api/orders');
```

---

### GET `/api/orders/:id`
Obtiene una orden específica por ID (solo el dueño o admin).

**🔒 Requiere autenticación**

**Ejemplo:**
```javascript
const order = await api.get('/api/orders/1');
```

**Respuesta:**
```json
{
  "id": 1,
  "userId": 1,
  "status": "pending",
  "total": 89.97,
  "shippingAddress": "Calle Principal 123",
  "paymentMethod": "tarjeta",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "price": 29.99,
      "product": {
        "name": "Producto 1"
      }
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 📝 Notas Importantes

1. **Autenticación**: Las rutas marcadas con 🔒 requieren un token JWT en el header `Authorization: Bearer <token>`

2. **Roles**: 
   - `user`: Usuario normal
   - `admin`: Administrador (puede crear/editar/eliminar productos y categorías)

3. **CORS**: El backend está configurado para aceptar peticiones desde `http://localhost:5173`

4. **Proxy**: El frontend tiene configurado un proxy en Vite, así que puedes usar rutas relativas como `/api/products` en lugar de `http://localhost:4000/api/products`

5. **Errores comunes**:
   - `401 Unauthorized`: Falta token o token inválido
   - `403 Forbidden`: No tienes permisos de administrador
   - `404 Not found`: La ruta no existe
   - `400 Bad Request`: Datos inválidos en el body

