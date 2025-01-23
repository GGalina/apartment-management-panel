const mongoose = require('mongoose');
const { Apartment } = require('./models/Apartment');

// Test database connection and write operation
const testDatabase = async () => {
  try {
    // Replace with your actual MongoDB URI
    const DB_URI = 'mongodb+srv://testtask:02XelQXkDfaTEnYL@apartment.xfn0q.mongodb.net/?retryWrites=true&w=majority&appName=Apartment';
    
    // Connect to MongoDB
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    // Create a test apartment document
    const testApartment = new Apartment({
      title: 'Test Apartment',
      description: 'Test Description',
      price: 15000,
      rooms: 3,
    });

    // Save the test apartment to the database
    const savedApartment = await testApartment.save();
    console.log('Test apartment saved:', savedApartment);

  } catch (error) {
    console.error('Error:', error.message);  // Log any error
  } finally {
    // Close the database connection after the test
    mongoose.disconnect();
  }
};

// Run the test
testDatabase();
