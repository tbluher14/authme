import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews, deleteReview } from "../../store/review";
import "./UserReviews.css";

function UsersReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userReviewsObj = useSelector((state) => state.reviews);
  const userReviews = Object.values(userReviewsObj);
  console.log(userReviews)

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
      <div className="page_container">
        <h2>My Reviews:</h2>
        {userReviews.map((review) => (
          <div key={review.id}>
            <div className="ind_review_box">
              <div className="ind_review_header">
                <h2 className="header">
                  Review for:
                  </h2>
                 <div className="review_for_name">
                  {review.Spot.name}
                </div>
              </div>
                  <div className="ind_review_stars">{review.stars} out of 5 stars</div>
              <div className="review_text">{review.review}</div>
              <button
                onClick={removeReview(review.id)}
                className="delete_review"
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
