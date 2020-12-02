const express = require('express');
const router = express.Router();

const authentifiedVerification = require('../middleware/authentifiedVerification');
const multerUploadMiddleware = require('../middleware/multerUploadMiddleware');

const imgCrtl = require("../controllers/imagesController");

router.post("/upload", authentifiedVerification, multerUploadMiddleware, imgCrtl.uploadImage);

module.exports = router;