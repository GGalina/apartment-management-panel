const mongoose = require('mongoose');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');
const { Apartment } = require('../models/Apartment');

//------------------------------Create an apartment-----------------------------------//
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

//------------------------------Update an apartment by ID-----------------------------------//
const updateApartmentById = async (req, res) => {
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

//------------------------------Delete an apartment by ID-----------------------------------//
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

//------------------------------Fetch all apartments-----------------------------------//
const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find();

    if (apartments.length === 0) {
      return res.status(404).json({ message: 'No apartments found' });
    }

    res.status(200).json(apartments);

  } catch (error) {
    next(error); 
  }
};

//------------------------------Filter by price (less than or equal to)-----------------------------------//
const filterByPrice = async (req, res, next) => {
  const { price } = req.query;

  // Validate the query parameter
  if (!price || isNaN(price)) {
    return res.status(400).json({ message: 'Invalid or missing price parameter' });
  }

  try {
    const apartments = await Apartment.find({ price: { $lte: Number(price) } });

    if (apartments.length === 0) {
      return res.status(404).json({ message: 'No apartments found within the specified price range' });
    }

    res.status(200).json(apartments);

  } catch (err) {
    next(err);
  }
};

//------------------------------Filter by number of rooms-----------------------------------//
const filterByRooms = async (req, res, next) => {
  const { rooms } = req.query;

  try {
    // Ensure the number of rooms is valid
    const validRooms = [1, 2, 3];
    const roomsNumber = parseInt(rooms, 10);

    if (!validRooms.includes(roomsNumber)) {
      return res.status(400).json({
        message: `Invalid number of rooms. It must be one of the following: ${validRooms.join(', ')}`,
      });
    }

    const apartments = await Apartment.find({ rooms: roomsNumber });

    res.status(200).json(apartments);

  } catch (err) {
    next(err);
  }
};

module.exports = {
  createApartment: ctrlWrapper(createApartment),
  updateApartmentById: ctrlWrapper(updateApartmentById),
  deleteApartmentById: ctrlWrapper(deleteApartmentById),
  getAllApartments: ctrlWrapper(getAllApartments),
  filterByPrice: ctrlWrapper(filterByPrice),
  filterByRooms: ctrlWrapper(filterByRooms),
};
