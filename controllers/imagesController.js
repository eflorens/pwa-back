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

exports.getImages = (req, res, next) => {
	Image.find({userId: req.userId}).then(
		(images) => {
			imgUrls = []
			images.forEach((image) => {
				imgUrls.push({ 
					id: image._id,
					imgUrl: image.imgUrl });
			});
			return res.send(imgUrls);
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};

exports.getImageById = (req, res, next) => {
	Image.find({userId: req.userId}).then(
		(images) => {
			const img = images.find(image => image._id == req.params.id);

			return res.send(img != undefined ? {id: img._id, imgUrl: img.imgUrl} : {});
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};