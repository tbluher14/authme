import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews, deleteReview } from "../../store/review";
import * as sessionActions from '../../store/session';
import "./UserReviews.css";

function UsersReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userReviewsObj = useSelector((state) => state.reviews);
  const userReviews = Object.values(userReviewsObj);

  const logOut = (e) => {
    e.preventDefault()
    dispatch( () => sessionActions.logout())
  }

  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {
    dispatch(getUserReviews()).then(() => setIsloaded(true));
  }, [dispatch]);

  const removeReview = (reviewId) => async (e) => {
    const result = window.confirm("Are you sure you want to delete this review?")

    if (result){
      e.preventDefault();
      await dispatch(deleteReview(reviewId));
      await dispatch(getUserReviews());

      history.push("/reviews/current");
    }
  };

  if (userReviews.length === 0) {
    return <p>Oh no! No reviews yet.</p>;
  }

  return (
    isLoaded && (
      <div className="my_reviews_page_container">
        <h2>My Reviews:</h2>
        {userReviews.map((review) => (
          <div key={review.id}>
            <div className="my_ind_review_box">
                <h2 className="my_ind_review_header">
                  Review for:
                  </h2>
                 <div className="my_review_for_name">
                  {review.Spot.name}
                </div>
                  <div className="my_ind_review_stars">{review.stars} out of 5 stars</div>
              <div id="my_review_text">{review.review}</div>
              <div className="my_review_button_container">
              <button
                onClick={() => history.push(`/spots/${review.Spot.id}`)}
                className="my_review_spot_button"
              >
                Go To Review
              </button>
              <button
                onClick={removeReview(review.id)}
                className="delete_review"
              >
                Delete Review
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default UsersReviews;
