const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI;
    if (!uri) {
      throw new Error('DB_URI is not defined in environment variables');
    }
    await mongoose.connect(uri); 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
