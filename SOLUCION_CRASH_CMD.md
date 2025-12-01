# 🔧 Solución al Crash - Comandos para CMD

## Si estás en CMD (Command Prompt):

### Opción 1: Eliminar la base de datos
```cmd
cd backend
del data\database.sqlite
```

### Opción 2: Si el archivo no existe o ya lo eliminaste
Simplemente reinicia el servidor:
```cmd
cd backend
npm run dev
```

## Si quieres usar PowerShell:

1. Abre PowerShell (no CMD)
2. Navega a la carpeta:
   ```powershell
   cd F:\Back-End\backend
   ```
3. Elimina el archivo:
   ```powershell
   Remove-Item data\database.sqlite
   ```
4. Reinicia el servidor:
   ```powershell
   npm run dev
   ```

## Después de reiniciar:

Ejecuta el seed para poblar la base de datos:
```cmd
cd backend
npm run seed
```

