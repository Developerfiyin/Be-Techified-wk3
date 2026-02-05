const Joi = require("joi")
const joi = require("joi")

const ValidaTodo = (req, res, next) =>{
const schema = Joi.object({
    task: Joi.string().min(5).max(100).required(),
completed : Joi.boolen().default(false)
}) 
const {error } = schema.validate(req.body);
if (error) {
    return res.status(400).json({error : error.details[0].message})
}
}
 
module.exports = ValidaTodo