const Image = require('../models/imagesModel');

exports.uploadImage = (req, res, next) => {
	const image = new Image({
		title: req.file.filename,
		imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		userId: req.userId
	});
	image.save().then(
		() => {
			res.status(201).json({
				message: 'Image successfully registered'
			});
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};