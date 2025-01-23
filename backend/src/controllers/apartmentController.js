const { Apartment } = require('../models/Apartment');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const { HttpError } = require('../helpers/HttpError');

// Create an apartment
const createApartment = async (req, res) => {
  const { title, description, price, rooms, photos } = req.body;

  try {
    const newApartment = await Apartment.create({
    title,
    description,
    price,
    rooms,
    photos,
  });

  res.status(201).json(newApartment);

  } catch (err) {
    throw new HttpError(500); // Internal Server Error
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
const deleteApartmentById = async (req, res) => {
  const { apartmentId } = req.params;

  try {
    const apartment = await Apartment.deleteOne({ _id: apartmentId });

    if (apartment.deletedCount === 0) {
      throw new HttpError(404); // Not Found
    }

    res.json({ message: 'Apartment deleted' });
  } catch (err) {
    throw new HttpError(500); // Internal Server Error
  }
};

// Get all apartments with optional filters
const getAllApartments = async (req, res) => {
  const { price, rooms } = req.query;  // Filters passed as query parameters

  let filterCriteria = {};

  if (price) {
    // Apply price filter (less than or equal to the price)
    filterCriteria.price = { $lte: price };
  }

  if (rooms) {
    // Apply rooms filter
    filterCriteria.rooms = rooms;
  }

  try {
    const apartments = await Apartment.find(filterCriteria); 
    res.json(apartments);
  } catch (err) {
    throw new HttpError(500); // Internal Server Error
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
