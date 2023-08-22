import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./css/singleCar.css";
import Loading from "../components/Loading";
import WarningAlert from "../components/WarningAlert";
import SuccessAlert from "../components/SuccessAlert";

import { useAuthContext } from "../hooks/useAuthContext";

const BookCar = () => {
  const { carid } = useParams();
  const {
    data: carDetails,
    error,
    isPending,
  } = useFetch("api/car/getCar/" + carid);

  // State to track the selected start and end dates
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  const { user } = useAuthContext();

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];

    // Check if the selectedStartDate is in the past
    if (selectedStartDate < currentDate) {
      setErr("Start date cannot be in the past.");
      return;
    }

    // Check if the selectedStartDate is greater than the endDate (if endDate is already selected)
    if (end_date && selectedStartDate >= end_date) {
      setErr("Start date must be earlier than the end date.");
      return;
    }

    // Calculate the total days between start and end dates
    if (selectedStartDate && end_date) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(end_date);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setTotalDays(differenceInDays);
    }

    // If all validations pass, update the startDate state
    setStartDate(selectedStartDate);
    setErr("");
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];

    // Check if the selectedEndDate is in the past
    if (selectedEndDate < currentDate) {
      setErr("End date cannot be in the past.");
      return;
    }

    // Check if the selectedEndDate is earlier than the startDate (if startDate is already selected)
    if (start_date && selectedEndDate <= start_date) {
      setErr("End date must be later than the start date.");
      return;
    }

    // Calculate the total days between start and end dates
    if (selectedEndDate && start_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(selectedEndDate);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setTotalDays(differenceInDays);
    }

    // If all validations pass, update the endDate state
    setEndDate(selectedEndDate);
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the selected dates (you can add more validation as needed)
    if (!start_date || !end_date) {
      setErr("Please select both start and end dates.");
      return;
    }

    try {
      // Send the booking request to the server
      const response = await fetch("http://127.0.0.1:4000/api/book/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          car_id: carid,
          start_date: start_date,
          end_date: end_date,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Booking successful
      setSuccess("Car Booked Successfully");
      // You can redirect the user to a confirmation page or update the UI accordingly
    } catch (err) {
      console.error(err.message);
      setErr(err.message);
    }
  };

  return (
    <div className="book-car">
       {isPending && <Loading />}
      {carDetails && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://c.ndtvimg.com/2020-08/odenf29o_mahindra-thar_625x300_22_August_20.jpg"
                className="img-fluid car-image"
                alt={carDetails.brand}
              />
            </div>
            <div className="col-md-6 car-details">
              <h2 className="mb-4">{carDetails.brand}</h2>
              <p>
                <strong>Model:</strong> {carDetails.model}
              </p>
              <p>
                <strong>Model Year:</strong> {carDetails.year}
              </p>
              <p>
                <strong>Color:</strong> {carDetails.color}
              </p>
              <p>
                <strong>Mileage:</strong> {carDetails.mileage} km
              </p>
              <p>
                <strong>Fuel Type:</strong>{" "}
                {carDetails.fuelType || "Not Defined"}
              </p>
              <p>
                <strong>Price Per Day:</strong>{" "}
                {"₹" + carDetails.price_per_day || "Not defined"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {carDetails.location || "Not defined"}
              </p>
            </div>
          </div>
        </div>
      )}

      {err && <WarningAlert error={err} />}
      {success && <SuccessAlert success={success} />}

      {/* Booking Form */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Booking Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="startDate" className="form-label">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    onChange={handleStartDateChange}
                    name="startDate"
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="endDate" className="form-label">
                    End Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    onChange={handleEndDateChange}
                    name="endDate"
                    required
                  />
                </div>
              </div>
              <p>
                <strong>Total Days : {totalDays}</strong>
              </p>
              <p>
                <strong>
                  Total Amount :{" "}
                  {carDetails && carDetails.price_per_day
                    ? `₹${carDetails.price_per_day * totalDays}`
                    : "Not defined"}
                </strong>
              </p>
              {/* Additional form fields for booking details */}
              <div className="d-grid gap-2">
                <br />
                <button className="btn btn-success" type="submit">
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default BookCar;
