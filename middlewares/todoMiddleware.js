const Joi = require("joi");

const todoCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  });

const todoUpdateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('completed', 'pending'),
  });

const validTodoCreation = (req, res, next) => {
    const { error, value } = todoCreateSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validTodoUpdate = (req, res, next) => {
    const { error, value } = todoUpdateSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validTodoCreation, validTodoUpdate }
