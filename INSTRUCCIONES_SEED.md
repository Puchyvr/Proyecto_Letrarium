# 🌱 Instrucciones para Poblar la Base de Datos

## Problema
La base de datos está vacía, por eso no ves categorías ni productos en el frontend.

## Solución

### Paso 1: Ejecutar el script de seed

En la terminal, dentro de la carpeta `backend`, ejecuta:

```bash
cd backend
npm run seed
```

Este comando creará:
- ✅ 8 categorías (Novelas, Ciencia Ficción, Cómics, Fantasía, Romance, Misterio, Histórica, Biografía)
- ✅ 10 productos de ejemplo con información completa

### Paso 2: Verificar que funcionó

Deberías ver mensajes como:
```
🌱 Iniciando seed de la base de datos...
✅ 8 categorías creadas
✅ 10 productos creados
🎉 Seed completado exitosamente!
```

### Paso 3: Recargar el frontend

Después de ejecutar el seed:
1. Recarga la página del frontend (`http://localhost:5173`)
2. Deberías ver las categorías y productos

## Nota Importante

- El script solo crea datos si la base de datos está vacía
- Si ya hay datos, verás un mensaje indicando que ya existen datos
- Si quieres volver a poblar la base de datos, primero elimina el archivo `backend/data/database.sqlite` y vuelve a ejecutar el seed

## Productos que se crearán

1. El Quijote de la Mancha - Novelas
2. 1984 - Ciencia Ficción
3. Dune - Ciencia Ficción
4. Watchmen - Cómics
5. El Señor de los Anillos - Fantasía
6. Harry Potter y la Piedra Filosofal - Fantasía
7. Orgullo y Prejuicio - Romance
8. El Código Da Vinci - Misterio
9. Sapiens - Histórica
10. Steve Jobs - Biografía

¡Listo! Ahora deberías ver todos los productos y categorías en tu aplicación.

