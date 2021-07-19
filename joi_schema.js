const Joi = require('joi');

module.exports.post_joi_schema = Joi.object({
    post: Joi.object({
        title : Joi.string().required(),
        description : Joi.number().required()
    }).required()
});