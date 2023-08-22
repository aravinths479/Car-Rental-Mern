import "./Car.css";
import { Link } from "react-router-dom";

const Car = ({ car }) => {
  const { _id, imageSrc, brand, model, mileage, price_per_day } = car;

  return (
    <div className="car">
      <Link to={`singleCar/${_id}`} className="card-link"> 
        <div className="card">
          <img
            src={'https://c.ndtvimg.com/2020-08/odenf29o_mahindra-thar_625x300_22_August_20.jpg'}
            className="card-img-top"
            alt={brand}
          />
          <div className="card-body">
            <h5 className="card-title">{brand}</h5>
            <p className="card-text">Model: {model}</p>
            <p className="card-text">Mileage: {mileage}</p>
            <p className="card-text">Price Per Day: ₹{price_per_day}</p>
          </div>
        </div>
      </Link>
      <br />
    </div>
  );
};

export default Car;
