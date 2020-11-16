const Joi = require('joi');

module.exports = (req, res, next) => {
	const schema = Joi.object({
		username: Joi.string().min(4).max(25).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(30).required(),
		password_confirmation: Joi.string().required().valid(Joi.ref('password'))
	});

	const {error} = schema.validate(req.body);

	if (error) return res.status(422).json(error.details);

	next();
};