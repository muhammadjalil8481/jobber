import Joi, { ObjectSchema } from "joi";

const createSellerSchema: ObjectSchema = Joi.object({
  buyerId: Joi.string().required().messages({
    "string.base": "buyerId must be of type string",
    "string.empty": "buyerId is required",
    "any.required": "buyerId is required",
  }),

  description: Joi.string().min(10).required().messages({
    "string.base": "description must be of type string",
    "string.empty": "Seller description is required",
    "any.required": "Seller description is required",
    "string.min": "description must be at least {#limit} characters long",
  }),

  oneliner: Joi.string().optional().messages({
    "string.base": "oneliner must be of type string",
  }),

  skills: Joi.array()
    .items(
      Joi.object({
        skill: Joi.string().required().messages({
          "string.base": "skill must be of type string",
          "string.empty": "skill is required",
          "any.required": "skill is required",
        }),
        level: Joi.number().min(1).max(10).required().messages({
          "number.base": "level must be a number",
          "number.min": "level must be at least {#limit}",
          "number.max": "level must be at most {#limit}",
          "any.required": "level is required",
        }),
      }).required().messages({
        "object.base": "Each skill must be an object",
        "any.required": "Skill entry is required",
      })
    )
    .required()
    .min(1)
    .messages({
      "array.base": "skills must be an array",
      "array.min": "please add at least one skill",
      "any.required": "skills are required",
    }),

  languages: Joi.array()
    .items(
      Joi.object({
        language: Joi.string().required().messages({
          "string.base": "language must be of type string",
          "string.empty": "language is required",
          "any.required": "language is required",
        }),
        level: Joi.string().required().messages({
          "string.base": "level must be of type string",
          "string.empty": "level is required",
          "any.required": "level is required",
        }),
      }).required().messages({
        "object.base": "Each language must be an object",
        "any.required": "Language entry is required",
      })
    )
    .required()
    .min(1)
    .messages({
      "array.base": "languages must be an array",
      "array.min": "Please add at least one language",
      "any.required": "languages are required",
    }),

  experience: Joi.array()
    .items(
      Joi.object({
        company: Joi.string().required().messages({
          "string.base": "company must be of type string",
          "string.empty": "company is required",
          "any.required": "company is required",
        }),
        title: Joi.string().required().messages({
          "string.base": "title must be of type string",
          "string.empty": "title is required",
          "any.required": "title is required",
        }),
        startDate: Joi.string().required().messages({
          "string.base": "startDate must be of type string",
          "string.empty": "startDate is required",
          "any.required": "startDate is required",
        }),
        endDate: Joi.string().optional().allow(null, ""),
        description: Joi.string().optional().allow(null, ""),
        currentlyWorkingHere: Joi.boolean().required().messages({
          "boolean.base": "currentlyWorkingHere must be a boolean",
          "any.required": "currentlyWorkingHere is required",
        }),
      }).required().messages({
        "object.base": "Each experience must be an object",
        "any.required": "Experience entry is required",
      })
    )
    .required()
    .min(1)
    .messages({
      "array.base": "experience must be an array",
      "array.min": "Please add at least one work experience",
      "any.required": "experience is required",
    }),

  education: Joi.array()
    .items(
      Joi.object({
        country: Joi.string().required().messages({
          "string.base": "country must be of type string",
          "string.empty": "country is required",
          "any.required": "country is required",
        }),
        university: Joi.string().required().messages({
          "string.base": "university must be of type string",
          "string.empty": "university is required",
          "any.required": "university is required",
        }),
        title: Joi.string().required().messages({
          "string.base": "title must be of type string",
          "string.empty": "title is required",
          "any.required": "title is required",
        }),
        major: Joi.string().required().messages({
          "string.base": "major must be of type string",
          "string.empty": "major is required",
          "any.required": "major is required",
        }),
        year: Joi.string().required().messages({
          "string.base": "year must be of type string",
          "string.empty": "year is required",
          "any.required": "year is required",
        }),
      }).required().messages({
        "object.base": "Each education entry must be an object",
        "any.required": "Education entry is required",
      })
    )
    .required()
    .min(1)
    .messages({
      "array.base": "education must be an array",
      "array.min": "Please add at least one education",
      "any.required": "education is required",
    }),

  socialLinks: Joi.array().optional().allow(null, "").messages({
    "array.base": "socialLinks must be an array",
  }),

  certificates: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.base": "certificate name must be of type string",
          "string.empty": "certificate name is required",
          "any.required": "certificate name is required",
        }),
        from: Joi.string().required().messages({
          "string.base": "certificate from must be of type string",
          "string.empty": "certificate from is required",
          "any.required": "certificate from is required",
        }),
        year: Joi.number().required().messages({
          "number.base": "certificate year must be a number",
          "any.required": "certificate year is required",
        }),
      }).required().messages({
        "object.base": "Each certificate must be an object",
        "any.required": "Certificate entry is required",
      })
    )
    .optional()
    .allow(null, "")
    .messages({
      "array.base": "certificates must be an array",
    }),
});

export { createSellerSchema };
