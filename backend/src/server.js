const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');
const app = require('./app');
const { sequelize } = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');
const OrderItem = require('./models/OrderItem');
const CartItem = require('./models/CartItem');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Intentar sincronizar con alter para actualizar esquema si es necesario
    // Si falla, intentar sin alter (solo crea tablas nuevas)
    try {
      await sequelize.sync({ alter: true });
      console.log('✅ Base de datos sincronizada');
    } catch (syncError) {
      console.warn('⚠️  Advertencia al sincronizar con alter:', syncError.message);
      console.log('Intentando sincronización básica...');
      try {
        await sequelize.sync({ force: false });
        console.log('✅ Base de datos sincronizada (modo básico)');
      } catch (basicError) {
        console.error('❌ Error crítico al sincronizar base de datos:', basicError.message);
        throw basicError;
      }
    }

    // Crear super admin si no existe
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@letrarium.com';
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'admin123';
    
    const bcrypt = require('bcryptjs');
    
    try {
      const existingSuperAdmin = await User.findOne({ where: { email: superAdminEmail } });
      
      if (!existingSuperAdmin) {
        const passwordHash = await bcrypt.hash(superAdminPassword, 10);
        await User.create({
          name: 'Super Admin',
          email: superAdminEmail,
          passwordHash,
          role: 'superadmin'
        });
        console.log(`✅ Super admin creado: ${superAdminEmail} / ${superAdminPassword}`);
      } else {
        // Actualizar a superadmin si ya existe pero no tiene el rol
        if (existingSuperAdmin.role !== 'superadmin') {
          try {
            existingSuperAdmin.role = 'superadmin';
            await existingSuperAdmin.save();
            console.log(`✅ Usuario ${superAdminEmail} actualizado a superadmin`);
          } catch (updateError) {
            console.warn(`⚠️  No se pudo actualizar el rol del usuario ${superAdminEmail}:`, updateError.message);
          }
        } else {
          console.log(`ℹ️  Super admin ya existe: ${superAdminEmail}`);
        }
      }
    } catch (adminError) {
      console.warn('⚠️  Advertencia al crear/actualizar super admin:', adminError.message);
      // No detener el servidor si falla la creación del super admin
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    console.error('💡 Si el problema persiste, intenta eliminar el archivo database.sqlite y reiniciar');
    process.exit(1);
  }
}

start();
