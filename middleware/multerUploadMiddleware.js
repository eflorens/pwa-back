const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		req.image = file;
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	}
});

module.exports = multer({ storage: storage }).single('image');