const express = require('express');
const router = express.Router();

const authentifiedVerification = require('../middleware/authentifiedVerification');

const imgCrtl = require("../controllers/imagesController");

router.post("/upload", authentifiedVerification, imgCrtl.uploadImage);

module.exports = router;