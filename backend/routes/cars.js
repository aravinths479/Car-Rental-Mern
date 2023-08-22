const express = require("express");
const router = express.Router();

const { getCars, getCar } = require("../controllers/carController");

router.get("/getCars", getCars);
router.get("/getCar/:id",getCar)

module.exports = router;
