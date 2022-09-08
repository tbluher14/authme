import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews, deleteReview } from "../../store/review";
// import "./UsersReviews.css";

function UsersReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userReviewsObj = useSelector((state) => state.reviews);
  const userReviews = Object.values(userReviewsObj);
  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {
    dispatch(getUserReviews()).then(() => setIsloaded(true));
  }, [dispatch]);

  const removeReview = (reviewId) => async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(reviewId));
    await dispatch(getUserReviews());

    history.push("/reviews/current");
  };

  if (userReviews.length === 0) {
    return <p>Oh no! No reviews yet.</p>;
  }

  return (
    isLoaded && (
      <div>
        <h2>My Reviews</h2>
        {userReviews.map((review) => (
          <div key={review.id} >
            <div>
              <div>
                <div>
                  <i></i>
                  <p>{review.stars} out of 5 stars</p>
                </div>
              </div>
              <div>{review.review}</div>
              <button
                onClick={removeReview(review.id)}
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default UsersReviews;
