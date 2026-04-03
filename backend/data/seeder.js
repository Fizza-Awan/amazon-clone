const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const products = require('./products');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@amazon.com',
      password: 'admin123',
      isAdmin: true,
    });

    const sampleProducts = products.map((p) => ({ ...p }));
    await Product.insertMany(sampleProducts);

    console.log('✅ Data imported successfully!');
    console.log('Admin email: admin@amazon.com');
    console.log('Admin password: admin123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();