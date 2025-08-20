import Joi, { ObjectSchema } from "joi";

export const updateGigSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().optional().messages({
    'string.base': 'Please add a gig title',
    'string.empty': 'Gig title is required',
    'any.required': 'Gig title is required'
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Please add a gig description',
    'string.empty': 'Gig description is required',
    'any.required': 'Gig description is required'
  }),
  categories: Joi.string().optional().messages({
    'string.base': 'Please select a category',
    'string.empty': 'Gig category is required',
    'any.required': 'Gig category is required'
  }),
  subCategories: Joi.array().items(Joi.string()).optional().messages({
    'string.base': 'Please add at least one subcategory',
    'string.empty': 'Gig subcategories are required',
    'any.required': 'Gig subcategories are required',
    'array.min': 'Please add at least one subcategory'
  }),
  tags: Joi.array().items(Joi.string()).optional().messages({
    'string.base': 'Please add at least one tag',
    'string.empty': 'Gig tags are required',
    'any.required': 'Gig tags are required',
    'array.min': 'Please add at least one tag'
  }),
  price: Joi.number().optional().greater(4.99).messages({
    'string.base': 'Please add a gig price',
    'string.empty': 'Gig price is required',
    'any.required': 'Gig price is required',
    'number.greater': 'Gig price must be greater than $4.99'
  }),
  coverImage: Joi.string().optional().messages({
    'string.base': 'Please add a cover image',
    'string.empty': 'Gig cover image is required',
    'any.required': 'Gig cover image is required',
    'array.min': 'Please add a cover image'
  }),
  expectedDelivery: Joi.string().optional().messages({
    'string.base': 'Please add expected delivery',
    'string.empty': 'Gig expected delivery is required',
    'any.required': 'Gig expected delivery is required',
    'array.min': 'Please add a expected delivery'
  }),
  basicTitle: Joi.string().optional().messages({
    'string.base': 'Please add basic title',
    'string.empty': 'Gig basic title is required',
    'any.required': 'Gig basic title is required',
    'array.min': 'Please add a basic title'
  }),
  basicDescription: Joi.string().optional().messages({
    'string.base': 'Please add basic description',
    'string.empty': 'Gig basic description is required',
    'any.required': 'Gig basic description is required',
    'array.min': 'Please add a basic description'
  })
});