const Image = require('../models/imagesModel');
const User = require('../models/usersModel');
const fs = require('fs');

exports.uploadImage = (req, res, next) => {

	User.findOne({_id: req.userId}).then(
		(user) => {
			console.log(user);
			const image = new Image({
				title: req.file.filename,
				imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
				postedBy: user.username,
				userIdOfPoster: req.userId
			});
			image.save().then(
				() => {
					res.status(201).json({
						message: 'Image successfully uploaded'
					});
				}
			).catch(
				(error) => {
					res.status(500).json({
						error: error
					});
				}
			);
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
	Image.find({userIdOfPoster: req.userId}).then(
		(images) => {
			return res.send(images);
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
	Image.findOne({_id: req.params.id}).then(
		(img) => {
			return res.send(img);
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};

exports.getAllImages = (req, res, next) => {
	Image.find().then(
		(img) => {
			return res.send(img);
		}
	).catch(
		(error) => {
			res.status(500).json({
				error: error
			});
		}
	);
};

exports.deleteImageById = (req, res, next) => {
	Image.findOne({userIdOfPoster: req.userId, _id: req.params.id}).then(
		(img) => {
			fs.unlink(`uploads/${img.title}`, () => {
				Image.deleteOne({userIdOfPoster: req.userId, _id: req.params.id}).then(
					() => res.status(200).json({message: "Image successfully deleted"})
				).catch(
					(error) => {
						res.status(500).json({
							error: error
						});
					}
				);
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