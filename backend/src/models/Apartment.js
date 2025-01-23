const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));
const handleMongooseError = require('../helpers/handleMongooseError');

const ApartmentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rooms: { type: Number, required: true },
    photos: { type: [String], required: false }, 
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

const Apartment = model('apartment', ApartmentSchema);

module.exports = {
  Apartment,
  apartmentAddSchema, 
  apartmentUpdateSchema,
};
