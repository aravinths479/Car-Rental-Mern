const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
  car_id: {
    type: ObjectId,
    ref: "Car",
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//compound index to enforce unique combination of car_id and user_id
reviewSchema.index({ car_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
