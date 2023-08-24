import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./css/singleCar.css";
import Loading from "../components/Loading";
import WarningAlert from "../components/WarningAlert";
import ReviewCard from "../components/ReviewCard";

const SingleCar = () => {
  const { id } = useParams();
  const {
    data: carDetails,
    error,
    isPending,
  } = useFetch("api/car/getCar/" + id);
  console.log(carDetails);

  const navigate = useNavigate();

  const BooknowPage = () =>{
    navigate('/booking/'+id );
  }

  return (
    <div className="single-car">
      {error && <WarningAlert error={error} />}
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

              <div className="d-grid gap-2">
                <br />
                <button className="btn btn-success" type="button" onClick={BooknowPage}>
                  Book Now
                </button>
              </div>
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

      
      
      <ReviewCard carId={id} />

      
    </div>
  );
};

export default SingleCar;
