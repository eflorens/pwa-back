const express = require('express');
const router = express.Router();

const authInputValidation = require('../middleware/authInputVerification');

const usrCtrl = require("../controllers/usersController");

router.post("/signup", authInputValidation, usrCtrl.signup);
router.post("/login", usrCtrl.login);

module.exports = router;