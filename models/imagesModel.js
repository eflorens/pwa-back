const mongoose = require('mongoose');

const imgSchema = mongoose.Schema({
	title: { type: String, required: true },
	imgUrl: { type: String, required: true },
	postedBy: { type: String, required: true },
	userIdOfPoster: { type: String, required: true }
});

module.exports = mongoose.model('Image', imgSchema);