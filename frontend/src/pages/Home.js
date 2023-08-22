import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Car from "../components/Car";
import Loading from "../components/Loading";
import WarningAlert from "../components/WarningAlert";
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {
  const user = useAuthContext()
  const { data: cars, IsPending, error } = useFetch("api/car/getCars",user.token);

  const [searchedLocation, setSearchedLocation] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    // Initially, set filteredCars to all cars
    setFilteredCars(cars || []);
  }, [cars]);

  const handleSearch = () => {
    if (!searchedLocation.trim()) {
      setFilteredCars(cars || []);
    } else {
      const filtered = cars.filter(
        (car) =>
          car.location.toLowerCase() === searchedLocation.trim().toLowerCase()
      );
      setFilteredCars(filtered);
    }
  };

  return (
    <div className="home">
      <div className="container text-center mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Search by location..."
                value={searchedLocation}
                onChange={(e) => setSearchedLocation(e.target.value)}
              />
              <button
                className="btn btn-primary rounded-pill"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <br />

      {error && <WarningAlert error={error}/> }

      

      {IsPending && <Loading />}

      <div className="container mt-4">
        <div className="row">
          {filteredCars?.map((car) => (
            <div key={car._id} className="col-md-3">
              <Car car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
