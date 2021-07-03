
function Validate(request) {
    var validationschema =
    {
        No: Joi.number().required(),
        Name: Joi.string().required(),
        Age: Joi.number().min(18).max(60).required()
    };
    return Joi.validate(request.body, validationschema)
}

module.exports = Validate;