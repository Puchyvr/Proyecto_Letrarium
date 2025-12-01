# Backend API

## Setup

- Copy `.env` values; edit as needed
- Install dependencies: `npm install`
- Run dev: `npm run dev`

## Folders
- `src/config`, `src/models`, `src/controllers`, `src/routes`, `src/middlewares`, `src/services`, `src/utils`

## Endpoints

Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot
- POST /api/auth/reset

Users
- GET /api/users/me
- PUT /api/users/me

Products
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

Categories
- GET /api/categories
- GET /api/categories/:id
- POST /api/categories (admin)
- PUT /api/categories/:id (admin)
- DELETE /api/categories/:id (admin)

Cart
- GET /api/cart
- POST /api/cart
- PUT /api/cart/:id
- DELETE /api/cart/:id
- DELETE /api/cart

Orders
- POST /api/orders
- GET /api/orders (admin)
- GET /api/orders/:id (owner/admin)

CORS: `CLIENT_ORIGIN` env, default http://localhost:5173

## 📖 Documentación de Rutas

Ver el archivo [RUTAS.md](./RUTAS.md) para la documentación completa de todas las rutas disponibles con ejemplos de uso.