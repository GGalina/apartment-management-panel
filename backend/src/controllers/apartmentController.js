const mongoose = require('mongoose');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const HttpError = require('../helpers/HttpError');
const { Apartment } = require('../models/Apartment');

//------------------------------Create an apartment-----------------------------------//
const createApartment = async (req, res) => {
  try {
    const { title, description, price, rooms } = req.body;
    const photos = res.locals.photoUrls || [];

    const newApartment = new Apartment({
      title,
      description,
      price,
      rooms,
      photos,
    });

    const savedApartment = await newApartment.save();
    res.status(201).json(savedApartment);

  } catch (err) {
    console.error(err);
    throw HttpError(500, "Error creating apartment");
  }
};

//------------------------------Update an apartment by ID-----------------------------------//
const updateApartmentById = async (req, res) => {
  const { apartmentId } = req.params;

  try {
    // Fetch the apartment to get current photos
    const apartment = await Apartment.findById(apartmentId);
    if (!apartment) {
      throw HttpError(404, "Apartment not found");
    }

    // Update apartment with provided data
    const updateApartment = await Apartment.updateOne({ _id: apartmentId }, req.body);

    if (updateApartment.modifiedCount === 0) {
      throw HttpError(404, "Apartment not found or no changes made");
    }

    // If new photos are uploaded, process them
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map((file) => file.path);
      req.body.photos = [...apartment.photos, ...newPhotos].slice(0, 5);
    } else {
      // If no new photos, keep existing ones
      req.body.photos = apartment.photos;
    }

    // Update the apartment with the new photos
    const updatedApartment = await Apartment.findByIdAndUpdate(apartmentId, req.body, { new: true });

    res.json(updatedApartment);

  } catch (err) {
    console.error("Error updating apartment:", err);
    throw HttpError(500, "Internal Server Error");
  }
};

//------------------------------Delete an apartment by ID-----------------------------------//
const deleteApartmentById = async (req, res, next) => {
  try {
    const { apartmentId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(apartmentId)) {
      return next(HttpError(400, "Invalid apartment ID"));
    }

    const result = await Apartment.findByIdAndDelete(apartmentId);

    if (!result ) {
      return next(HttpError(404, "Apartment not found"));
    }

    res.status(200).json({ message: 'Apartment deleted successfully', apartmentId });

  } catch (error) {
    console.error("Error caught in deleteApartmentById:", error);
    next(error); 
  }
};


//------------------------------Fetch all apartments-----------------------------------//
const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await Apartment.find();

    if (apartments.length === 0) {
      res.status(200).json([]); 
    } else {
      res.status(200).json(apartments);
    }

  } catch (error) {
    next(error);
  }
};

//------------------------------Filter by price (less than or equal to)-----------------------------------//
const filterByPrice = async (req, res, next) => {
  const { price } = req.query;

  if (!price || isNaN(price)) {
    return next(HttpError(400, "Invalid or missing price parameter"));
  }

  try {
    const apartments = await Apartment.find({ price: { $lte: Number(price) } });

    if (apartments.length === 0) {
      return next(HttpError(404, "No apartments found within the specified price range"));
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
    const validRooms = [1, 2, 3];
    const roomsNumber = parseInt(rooms, 10);

    if (!validRooms.includes(roomsNumber)) {
      return next(HttpError(400, `Invalid number of rooms. It must be one of the following: ${validRooms.join(', ')}`));
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
