const multer = require('multer');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { HttpError } = require('../helpers/HttpError');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Cloudinary configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'apartments',  // Store apartment images in the "apartments" folder
        allowed_formats: ['jpg', 'jpeg', 'png'], // Accept only image files
    },
});

// Create multer instance for uploading multiple files (up to 5)
const upload = multer({ storage });

// Upload files to Cloudinary and return the URLs
const uploadToCloudinary = (req, res, next) => {
    upload.array('photos', 5)(req, res, (error) => {
        if (error) {
            console.error('Multer Upload Error:', error.message);
            return next(new HttpError(400, `Failed to upload files: ${error.message}`));
        }

        // If files are uploaded, store their URLs in res.locals
        if (!req.files || req.files.length === 0) {
            console.warn('No files uploaded');
            res.locals.photoUrls = [];
        } else {
            // Extract Cloudinary URLs
            res.locals.photoUrls = req.files.map((file) => file.path); // Cloudinary file URLs
        }

        next(); // Proceed to next middleware
    });
};

module.exports = {
    uploadToCloudinary,
};
