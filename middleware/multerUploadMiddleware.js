const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log("AAAAAh");
		req.image = file;
		console.log("REQ.IMAGE");
		cb(null, 'uploads');
		console.log("END OF DESTINATION");
	},
	filename: (req, file, cb) => {
		console.log("BEFORE FILENAME");
		cb(null, Date.now() + file.originalname);
		console.log("END OF FILENAME");
	}
});

module.exports = multer({ storage: storage }).single('image');