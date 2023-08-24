const Review = require("../models/reviewModel");

// Create new review
exports.createReview = async (req, res) => {
  const { car_id, rating, comment } = req.body;
  const user_id = req.user._id; 

  try {
    // Check if the user has already reviewed this car
    const existingReview = await Review.findOne({ car_id, user_id });
    if (existingReview) {
      return res.status(409).json({ message: "You have already reviewed this car." });
    }

    // Create the new review
    const newReview = new Review({
      car_id,
      user_id,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ message: "Review Added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add review. Please try again later." });
  }
};

// Get all reviews for a specific car
exports.getCarReviews = async (req, res) => {
  const car_id = req.params.carId;

  try {
    // Find reviews for a specific car using car_id
    const reviews = await Review.find({ car_id }).populate('user_id', 'username');
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get reviews. Please try again later." });
  }
};
