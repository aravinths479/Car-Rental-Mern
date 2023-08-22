require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')

//routes
const userRoutes = require("./routes/user");
const carRoutes = require("./routes/cars");
const bookingRoutes = require("./routes/booking")
const reviewRoutes = require('./routes/review')




// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//morgan
app.use(morgan("dev"));

//cors
app.use(cors())

// routes
app.use("/api/user", userRoutes);
app.use("/api/car", carRoutes);
app.use("/api/book", bookingRoutes )
app.use("/api/review",reviewRoutes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
