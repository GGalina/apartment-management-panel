const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const {uploadToCloudinary} = require('../middlewares/cloudinary')
const { apartmentAddSchema, 
    apartmentUpdateSchema } = require('../models/Apartment');
const { createApartment, 
    updateApartmentById, 
    deleteApartmentById, 
    getAllApartments,
    filterByPrice,
    filterByRooms } = require('../controllers/apartmentController');


// Route for creating an apartment
router.post('/create', uploadToCloudinary, validate(apartmentAddSchema), createApartment);
  
// Route for updating an apartment
router.put('/update/:apartmentId', validate(apartmentUpdateSchema), updateApartmentById);

// Route for deleting an apartment
router.delete('/delete/:apartmentId', deleteApartmentById);

// Route for getting all apartments
router.get('/', getAllApartments);

//Route for filtering by price
router.get('/filter/price', filterByPrice);

//Route for filtering by rooms
router.get('/filter/rooms', filterByRooms);

module.exports = router;
