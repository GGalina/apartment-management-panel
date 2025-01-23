const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const apartmentRoutes = require('./routes/apartmentRoutes');

dotenv.config();

const app = express();

// Middleware
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));  // HTTP request logger
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Middleware for parsing JSON data
app.use(express.urlencoded({ extended: false }));  // Middleware for parsing URL-encoded data

// Routes
app.use('/api', apartmentRoutes); 

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

// Export the app
module.exports = app;
