// Assuming you have imported necessary modules and models
const Booking = require('../models/bookingModel');
const Car = require('../models/carsModel');

// Helper function to calculate the total cost based on the car's price per day and booking duration
function calculateTotalCost(pricePerDay, startDate, endDate) {
  // Calculate the number of days between start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Calculate the total cost
  return pricePerDay * numDays;
}

// view my booking

exports.mybooking = async (req,res)=>{
  try {
    const bookings = await Booking.find({user_id:req.user._id}).populate("car_id");
    console.log(bookings);

    return res.json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

exports.bookingDetails = async (req,res)=>{
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId).populate("car_id");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json(booking);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}


// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user._id);
    const { car_id, start_date, end_date } = req.body;

    // Check if the car exists
    const car = await Car.findById(car_id);
    console.log(car);
    if (!car) {
      return res.status(404).json({ message: 'Car not found. Please provide a valid carId.' });
    }

    // Check if the car is available for the specified dates
    // You need to implement a function to check availability in your database
    const isCarAvailable = await Booking.checkCarAvailability(car_id, start_date, end_date);
    if (!isCarAvailable) {
      return res.status(409).json({ message: 'The car is already booked for the specified dates.' });
    }

    // Calculate the total cost based on the car's price per day and booking duration
    const total_cost = calculateTotalCost(car.price_per_day, start_date, end_date);

    // Create the booking
    const booking = new Booking({
      car_id,
      start_date,
      end_date,
      total_cost,
      user_id: req.user._id 
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found. Please provide a valid bookingId.' });
    }

    // Check if the user is authorized to update the booking (assuming userId is stored in the booking document)
    if (booking.userId !== req.user.id) {
      return res.status(401).json({ message: 'You are not authorized to update this booking.' });
    }

    // Check if the car is available for the updated dates
    // You need to implement a function to check availability in your database
    const isCarAvailable = await checkCarAvailability(booking.carId, startDate, endDate);
    if (!isCarAvailable) {
      return res.status(409).json({ message: 'The car is already booked for the updated dates.' });
    }

    // Update the booking details
    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.totalCost = calculateTotalCost(booking.car.price_per_day, startDate, endDate);
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Check if the booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found. Please provide a valid bookingId.' });
    }

    // Check if the user is authorized to cancel the booking (assuming userId is stored in the booking document)
    if (booking.userId !== req.user.id) {
      return res.status(401).json({ message: 'You are not authorized to cancel this booking.' });
    }

    // Remove the booking from the database
    await booking.remove();

    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

