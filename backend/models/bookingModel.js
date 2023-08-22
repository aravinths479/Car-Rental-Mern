const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  total_cost: {
    type: Number,
    required: true
  },
  // Additional booking details
});

bookingSchema.statics.checkCarAvailability = async function (carId, startDate, endDate) {
  // Check if there is any booking for the car with overlapping dates
  const bookings = await this.find({
    car_id: carId,
    start_date: { $lte: endDate }, // Check if the booked period overlaps with the given end date
    end_date: { $gte: startDate } // Check if the booked period overlaps with the given start date
  });

  return bookings.length === 0; // If no bookings with overlapping dates, the car is available
};

module.exports = mongoose.model("Booking", bookingSchema);
