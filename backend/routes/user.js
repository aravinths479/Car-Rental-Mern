const express = require("express");

// controller functions
const { loginUser, signupUser, getUserUpdate, postUserUpdate } = require("../controllers/userController");

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();


// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/getUserUpdate",requireAuth,getUserUpdate);
router.post("/postUserUpdate",requireAuth,postUserUpdate)

module.exports = router;
