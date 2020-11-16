const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const usrSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	//object photo for  later
});

usrSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', usrSchema);