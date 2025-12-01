# 🔧 Solución al Crash del Backend

## Problema
El servidor se está crasheando al iniciar, probablemente debido a cambios en el modelo Product.

## Solución Aplicada

He simplificado el modelo Product para que:
- Solo use el campo `title` (que ya existe en la base de datos)
- El controlador convierte automáticamente `title` a `name` para el frontend
- No se requiere modificar la estructura de la base de datos

## Pasos para Resolver

1. **El servidor debería reiniciarse automáticamente** con nodemon
2. Si sigue crasheando, **elimina la base de datos** y deja que se recree:
   ```bash
   # En Windows PowerShell
   cd backend
   Remove-Item data\database.sqlite
   ```

3. **Reinicia el servidor**:
   ```bash
   npm run dev
   ```

4. **Ejecuta el seed** para poblar la base de datos:
   ```bash
   npm run seed
   ```

## Si el Problema Persiste

Si aún se crashea, comparte el mensaje de error completo que aparece en la consola para poder diagnosticarlo mejor.

