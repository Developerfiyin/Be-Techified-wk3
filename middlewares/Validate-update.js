const Joi = require('joi');

const updateTodoSchema = Joi.object({
    task: Joi.string().min(3).max(100).optional(), // Optional for PATCH, min 3 chars rule
    completed: Joi.boolean().optional(),          // Optional bool
});

const validateTodoPatch = (req, res, next) => {
    const { error } = updateTodoSchema.validate(req.body, { 
    }); 

    if (error) {
        return res.status(400).json({ message: error.details.map(d => d.message) });
    }

    next(); // Valid - Proceed 
};

module.exports = validateTodoPatch;