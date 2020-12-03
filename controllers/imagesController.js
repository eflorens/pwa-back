const Image = require('../models/imagesModel');
const fs = require('fs');
const e = require('express');

exports.uploadImage = (req, res, next) => {
	console.log("TEST DEBUG uploadImage");
	const image = new Image({
		title: req.file.filename,
		/*imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,*/
		userId: req.userId
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
	Image.findOne({userId: req.userId, _id: req.params.id}).then(
		(img) => {
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

exports.deleteImageById = (req, res, next) => {
	Image.findOne({userId: req.userId, _id: req.params.id}).then(
		(img) => {
			fs.unlink(`uploads/${img.title}`, () => {
				Image.deleteOne({userId: req.userId, _id: req.params.id}).then(
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