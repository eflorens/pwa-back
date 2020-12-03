const express = require('express');
const router = express.Router();

const authentifiedVerification = require('../middleware/authentifiedVerification');
const multerUploadMiddleware = require('../middleware/multerUploadMiddleware');

const imgCrtl = require("../controllers/imagesController");

router.post("/", authentifiedVerification, multerUploadMiddleware, imgCrtl.uploadImage);
router.get("/", authentifiedVerification, imgCrtl.getImages);
router.get("/:id", authentifiedVerification, imgCrtl.getImageById);

module.exports = router;