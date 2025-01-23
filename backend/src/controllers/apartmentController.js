const { Apartment } = require('../models/Apartment');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');
const mongoose = require('mongoose');


// Create an apartment
const createApartment = async (req, res) => {
  try {
    const { title, description, price, rooms, photos } = req.body;
    
    const newApartment = new Apartment({
      title,
      description,
      price,
      rooms,
      photos: photos || [],
    });

    const savedApartment = await newApartment.save();

    res.status(201).json(savedApartment); 
  } catch (error) {
    res.status(500).json({ message: "Error creating apartment", error: error.message });
  }
};


// Edit an apartment by ID
const editApartmentById = async (req, res) => {
  const { apartmentId } = req.params;

  try {
    const updateApartment = await Apartment.updateOne({ _id: apartmentId }, req.body);

    if (updateApartment.modifiedCount === 0) {
      throw new HttpError(404); // Not Found
    }

    const apartment = await Apartment.findById(apartmentId);
    res.json(apartment);

  } catch (err) {
    throw new HttpError(500); // Internal Server Error
  }
};

// Delete an apartment by ID
const deleteApartmentById = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(apartmentId)) {
      return res.status(400).json({ message: 'Invalid apartment ID' });
    }

    const result = await Apartment.findByIdAndDelete(apartmentId);

    if (!result) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    res.status(200).json({ message: 'Apartment deleted successfully', apartmentId });
  } catch (error) {
    next(error); 
  }
};

// Get all apartments 
const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find();

    // If no apartments are found, return a 404
    if (apartments.length === 0) {
      return res.status(404).json({ message: 'No apartments found' });
    }

    res.status(200).json(apartments);

  } catch (error) {
    next(error); 
  }
};

// Filter by price (less than or equal to a given price)
const filterByPrice = async (req, res) => {
  const { price } = req.query;

  try {
    const apartments = await Apartment.find({ price: { $lte: price } });
    res.json(apartments);

  } catch (err) {
    throw new HttpError(500); // Internal Server Error
  }
};

// Filter by number of rooms
const filterByRooms = async (req, res) => {
  const { rooms } = req.query;

  try {
    const apartments = await Apartment.find({ rooms });
    res.json(apartments);
    
  } catch (err) {
    throw new HttpError(500); // Internal Server Error
  }
};

module.exports = {
  createApartment: ctrlWrapper(createApartment),
  editApartmentById: ctrlWrapper(editApartmentById),
  deleteApartmentById: ctrlWrapper(deleteApartmentById),
  getAllApartments: ctrlWrapper(getAllApartments),
  filterByPrice: ctrlWrapper(filterByPrice),
  filterByRooms: ctrlWrapper(filterByRooms),
};
