import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from "../components/Loading";
import WarningAlert from "../components/WarningAlert";

const MyBookings = () => {
  const { user } = useAuthContext();
  const [myBooking, setMyBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchMyBooking = async () => {
      try {
        const response = await fetch(
          "https://car-rental-mern.onrender.com/api/book/mybooking",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setMyBooking(data);
        if (data.length === 0) {
          setError("No bookings Found");
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchMyBooking();
  }, [user.token]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      <br />
      <h1 className="display-6">My Bookings</h1>
      <br />
      {isLoading && <Loading />}

      {error && <WarningAlert error={error} />}

      {myBooking &&
        myBooking.map((bookingDetail) => (
          <Link to={`/mybooking/${bookingDetail._id}`}>
          <div className="col-md-6 mb-4" key={bookingDetail._id}>
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4K2IqYGOyjw-3bWnjw6JEeFe4tlnAULOLwQ&usqp=CAU" // Assuming the car image is available in the car_id object
                className="card-img-top"
                alt="Car"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {bookingDetail.car_id.brand}
                </h5>
                <p className="card-text">
                  Start Date: {formatDate(bookingDetail.start_date)}
                </p>
                <p className="card-text">End Date: {formatDate(bookingDetail.end_date)}</p>
                <p className="card-text">
                  Total Cost: {bookingDetail.total_cost}
                </p>
                <p className="card-text">Booking ID: {bookingDetail._id}</p>
              </div>
            </div>
          </div>
          </Link>
        ))}
    </div>
  );
};

export default MyBookings;
