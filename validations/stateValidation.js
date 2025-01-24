const Joi = require('joi');

const stateValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        population: Joi.number().required(),
        area: Joi.number().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    next();
};

module.exports = stateValidation;
