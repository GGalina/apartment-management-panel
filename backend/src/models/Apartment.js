const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const Joi = require('joi').extend(require('@joi/date'));

const ApartmentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rooms: { type: Number, required: true },
    photos: { type: [String], required: false },  // Example for photos, assuming it's an array of strings
  }, {
    versionKey: false,  
    timestamps: true,   
  });
  

ApartmentSchema.post('save', handleMongooseError);

const apartmentAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  rooms: Joi.number().valid(1, 2, 3).required(), 
  photos: Joi.array().items(Joi.string()).optional(), 
});

const apartmentUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  rooms: Joi.number().valid(1, 2, 3).optional(),
  photos: Joi.array().items(Joi.string()).optional(),
});

const schemas = {
  apartmentAddSchema,
  apartmentUpdateSchema,
};

const Apartment = model('apartment', ApartmentSchema);

module.exports = {
  Apartment,
  schemas,
};
