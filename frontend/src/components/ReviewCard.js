const ReviewCard = () => {
    return ( 
        <div>
            <section className="container reviews-section">
        <br />
        <h2>Reviews</h2>
        <br />
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card review-card">
              <div className="card-body">
                <h5 className="card-title reviewer-name">
                  Reviewer Name 1<i className="fas fa-star text-warning"></i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    style={{ marginBottom: "6px" }}
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                </h5>
                <p className="card-text">
                  This car is amazing! I had a great experience driving it.
                </p>
                <p className="card-text review-date">Date of Review</p>
              </div>
            </div>
            <br />
            <div className="card review-card">
              <div className="card-body">
                <h5 className="card-title reviewer-name">
                  Reviewer Name 1<i className="fas fa-star text-warning"></i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    style={{ marginBottom: "6px" }}
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                </h5>
                <p className="card-text">
                  This car is amazing! I had a great experience driving it.
                </p>
                <p className="card-text review-date">Date of Review</p>
              </div>
            </div>
            <br />
            <div className="card review-card">
              <div className="card-body">
                <h5 className="card-title reviewer-name">
                  Reviewer Name 1<i className="fas fa-star text-warning"></i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                    style={{ marginBottom: "6px" }}
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                  </svg>
                </h5>
                <p className="card-text">
                  This car is amazing! I had a great experience driving it.
                </p>
                <p className="card-text review-date">Date of Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
        </div>
     );
}
 
export default ReviewCard;