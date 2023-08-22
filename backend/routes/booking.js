const express = require("express");
const router = express.Router();

const { mybooking, createBooking,bookingDetails, updateBooking, cancelBooking } = require("../controllers/bookingController");

const requireAuth = require('../middleware/requireAuth')

router.post("/booking", requireAuth, createBooking);
router.get('/mybooking',requireAuth, mybooking)
router.get('/mybooking/:id',requireAuth,bookingDetails)
// router.get("/getCar/:id", updateBooking);
// router.get("/getCar/:id", cancelBooking);

module.exports = router;
