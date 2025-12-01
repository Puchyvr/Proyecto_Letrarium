const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

async function seed() {
  try {
    await sequelize.sync({ alter: true });

    // Verificar si ya hay datos
    const existingCategories = await Category.count();
    if (existingCategories > 0) {
      console.log('✅ La base de datos ya tiene datos. Para rellenar de nuevo, elimina los datos existentes primero.');
      process.exit(0);
    }

    console.log('🌱 Iniciando seed de la base de datos...');

    // Crear categorías
    const categorias = await Category.bulkCreate([
      { name: 'Novelas' },
      { name: 'Ciencia Ficción' },
      { name: 'Cómics' },
      { name: 'Fantasía' },
      { name: 'Romance' },
      { name: 'Misterio' },
      { name: 'Histórica' },
      { name: 'Biografía' },
    ]);

    console.log(`✅ ${categorias.length} categorías creadas`);

    // Crear productos
    const productos = await Product.bulkCreate([
      {
        name: 'El Quijote de la Mancha',
        title: 'El Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        categoryId: categorias[0].id, // Novelas
        price: 25.99,
        type: 'Novela',
        description: 'La obra maestra de la literatura española. Una aventura épica que sigue las hazañas del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.',
        stock: 50,
        image: null,
      },
      {
        name: '1984',
        title: '1984',
        author: 'George Orwell',
        categoryId: categorias[1].id, // Ciencia Ficción
        price: 18.50,
        type: 'Ciencia Ficción',
        description: 'Una distopía clásica sobre un futuro totalitario donde el Gran Hermano vigila cada movimiento.',
        stock: 30,
        image: null,
      },
      {
        name: 'Dune',
        title: 'Dune',
        author: 'Frank Herbert',
        categoryId: categorias[1].id, // Ciencia Ficción
        price: 22.99,
        type: 'Ciencia Ficción',
        description: 'La épica historia de Paul Atreides en el planeta desértico de Arrakis, donde se encuentra la especia más valiosa del universo.',
        stock: 25,
        image: null,
      },
      {
        name: 'Watchmen',
        title: 'Watchmen',
        author: 'Alan Moore',
        categoryId: categorias[2].id, // Cómics
        price: 35.00,
        type: 'Cómic',
        description: 'Una obra maestra del cómic que deconstruye el género de superhéroes. Considerada una de las mejores novelas gráficas de todos los tiempos.',
        stock: 15,
        image: null,
      },
      {
        name: 'El Señor de los Anillos',
        title: 'El Señor de los Anillos',
        author: 'J.R.R. Tolkien',
        categoryId: categorias[3].id, // Fantasía
        price: 28.99,
        type: 'Fantasía',
        description: 'La trilogía épica que sigue la búsqueda de Frodo para destruir el Anillo Único y salvar la Tierra Media.',
        stock: 40,
        image: null,
      },
      {
        name: 'Harry Potter y la Piedra Filosofal',
        title: 'Harry Potter y la Piedra Filosofal',
        author: 'J.K. Rowling',
        categoryId: categorias[3].id, // Fantasía
        price: 19.99,
        type: 'Fantasía',
        description: 'El primer libro de la serie que introduce a Harry Potter al mundo mágico de Hogwarts.',
        stock: 60,
        image: null,
      },
      {
        name: 'Orgullo y Prejuicio',
        title: 'Orgullo y Prejuicio',
        author: 'Jane Austen',
        categoryId: categorias[4].id, // Romance
        price: 16.99,
        type: 'Romance',
        description: 'La historia de Elizabeth Bennet y el señor Darcy, una de las historias de amor más famosas de la literatura.',
        stock: 35,
        image: null,
      },
      {
        name: 'El Código Da Vinci',
        title: 'El Código Da Vinci',
        author: 'Dan Brown',
        categoryId: categorias[5].id, // Misterio
        price: 21.50,
        type: 'Misterio',
        description: 'Un thriller que combina historia, arte y misterio en una búsqueda por descubrir un secreto milenario.',
        stock: 28,
        image: null,
      },
      {
        name: 'Sapiens',
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        categoryId: categorias[6].id, // Histórica
        price: 24.99,
        type: 'Historia',
        description: 'Una breve historia de la humanidad que explora cómo los humanos conquistaron el mundo.',
        stock: 45,
        image: null,
      },
      {
        name: 'Steve Jobs',
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        categoryId: categorias[7].id, // Biografía
        price: 26.99,
        type: 'Biografía',
        description: 'La biografía autorizada del cofundador de Apple, basada en más de cuarenta entrevistas con Jobs.',
        stock: 20,
        image: null,
      },
    ]);

    console.log(`✅ ${productos.length} productos creados`);
    console.log('🎉 Seed completado exitosamente!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  }
}

seed();

