import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetch from "../hooks/useFetch";
import Loading from '../components/Loading'
import WarningAlert from "../components/WarningAlert";


const BookingInfo = () => {
  const [bookingInfo, setBookingInfo] = useState(null);
  const { id } = useParams()
  const { user } = useAuthContext();

  const { data: data, IsPending, error } = useFetch("api/book/mybooking/"+id,user.token);

  useEffect(() => {
    const fetchBookingInfo =  () => {
      setBookingInfo(data);
    };

    fetchBookingInfo();
  }, [data]);

  if (!bookingInfo) {
    return <Loading/>;
  }
  if(error){
    return <WarningAlert error={error}/>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mt-4">
    <h2>Booking Information</h2>
    <div className="row">
      <div className="col-md-6">
        {/* Car Image */}
        {/* Replace the 'car-image-url' with the actual image URL */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGKmsFfIy3SSRpZCuTJnXBn8YQMwSLd3HWw&usqp=CAU" alt="Car" style={{ width: "100%" }} />
      </div>
      <div className="col-md-6">
        {/* Car Details */}
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Brand</th>
              <td>{bookingInfo.car_id.brand}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{bookingInfo.car_id.model}</td>
            </tr>
            <tr>
              <th>Year</th>
              <td>{bookingInfo.car_id.year}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{bookingInfo.car_id.color}</td>
            </tr>
            <tr>
              <th>Mileage</th>
              <td>{bookingInfo.car_id.mileage}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{bookingInfo.car_id.status}</td>
            </tr>
            <tr>
              <th>Price per Day</th>
              <td>{bookingInfo.car_id.price_per_day}</td>
            </tr>
          </tbody>
        </table>
        {/* Damage Report Button */}
        <button className="btn btn-danger">Damage Report</button>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-md-12">
        {/* Booking Details */}
        <table className="table table-bordered">
  <tbody>
    <tr>
      <th>Start Date</th>
      <td>{formatDate(bookingInfo.start_date)}</td>
    </tr>
    <tr>
      <th>End Date</th>
      <td>{formatDate(bookingInfo.end_date)}</td> {/* Use end_date here */}
    </tr>
    <tr>
      <th>Total Cost</th>
      <td>{bookingInfo.total_cost}</td>
    </tr>
  </tbody>
</table>

      </div>
    </div>

    
  </div>
  );
};

export default BookingInfo;
