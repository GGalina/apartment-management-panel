const express = require('express');
const router = express.Router();
const { createApartment, 
    editApartmentById, 
    deleteApartmentById, 
    getAllApartments } = require('../controllers/apartmentController');
const { apartmentAddSchema, 
    apartmentUpdateSchema } = require('../models/Apartment');
const validate = require('../middlewares/validate');

// Route for creating an apartment
router.post('/create', validate(apartmentAddSchema), createApartment);

// Route for editing an apartment
router.put('/update/:apartmentId', validate(apartmentUpdateSchema), editApartmentById);

// Route for deleting an apartment
router.delete('/delete/:apartmentId', deleteApartmentById);

// Route for getting all apartments
router.get('/', getAllApartments);

//Route for filtering by price
router.get('/filter/price', filterByPrice);

module.exports = router;
