const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');  // Assuming you have a DB connection setup
const apartmentRoutes = require('./routes/apartmentRoutes');  // Update with your actual route file

dotenv.config();

const app = express();

// Middleware
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));  // HTTP request logger
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Middleware for parsing JSON data
app.use(express.urlencoded({ extended: false }));  // Middleware for parsing URL-encoded data

// Apply rate-limiting globally (to all routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api', apartmentRoutes);  // All apartment-related routes are prefixed with '/api'

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
