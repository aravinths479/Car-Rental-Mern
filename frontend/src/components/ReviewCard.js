import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";
import SuccessAlert from "../components/SuccessAlert";

const ReviewCard = ({ carId }) => {
  const { user } = useAuthContext();

  const [newReview, setNewReview] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [success, setSuccess] = useState("");

  // Fetch reviews using the useFetch hook
  const {
    data: data,
    isPending,
    error,
  } = useFetch(`api/review/carReviews/${carId}`, user.token); // Change 'reviews' to your API endpoint

  useEffect(() => {
    if (data) {
      console.log(data);
      setReviews(data); // Update the reviews state when data is fetched
    }
  }, [data]);

  const handleReviewSubmit = async () => {
    try {
      console.log("hai");
      const response = await fetch('https://car-rental-mern.onrender.com/api/review/createReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Assuming you have an authentication token
        },
        body: JSON.stringify({
          comment: newReview,
          car_id : carId,
          rating : 5
          // Add other data like rating, car_id, etc. as needed
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post review');
      }
  
      const newReviewData = await response.json();
      const newData = {user_id : {username : user.email },comment : newReview,date : formatDate(Date.now())}
      setReviews([...reviews, newData]); 
      console.log(newData);
      setNewReview(''); // Clear the textarea
      setSuccess("Review updated");
    } catch (error) {
      console.error(error);
      // Handle error, show a message, etc.
    }
  };
  

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <section className="container reviews-section">
        <br />
        <h2>Reviews</h2>
        {success && <SuccessAlert success={success} />}
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card review-card">
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Write Review
                  </label>
                  
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  ></textarea>
                  <br />
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary mb-0"
                      onClick={handleReviewSubmit}
                    >
                      Post Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        {isPending && <p>Loading reviews...</p>}
        {error && <p>Error fetching reviews: {error.message}</p>}
        {reviews && (
          <div className="row">
            {reviews.map((review, index) => (
              <div key={index} className="col-md-12 mb-4">
                <div className="card review-card">
                  <div className="card-body">
                    <h6 className="card-title reviewer-name">
                      {review.user_id.username} {/* Display username */}
                    </h6>
                    <p className="card-text">{review.comment}</p>
                    <p className="card-text review-date">
                      {formatDate(review.date)}
                    </p>{" "}
                    {/* Format date and time */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <br />
    </div>
  );
};

export default ReviewCard;
