const express = require("express");
const { handleLogin, handleSignup } = require("../controllers/userController");
const validateUserData = require("../middlewares/UserValidation")
const router = express.Router();


router.post("/login", validateUserData, handleLogin);
router.post("/signup", handleSignup);

module.exports = router;