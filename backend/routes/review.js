const express = require("express");
const router = express.Router();

const requireAuth = require('../middleware/requireAuth')

const  { getCarReviews, createReview } = require("../controllers/reviewController")

router.get("/carReviews/:carId",requireAuth,getCarReviews)
router.post("/createReview",requireAuth,createReview)


module.exports = router;
