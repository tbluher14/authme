import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/review";


function SpotReviews({ spot }) {
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => state.reviews)
  console.log('this is the reviews obj', reviewsObj)
  const reviews = Object.values(reviewsObj);

  const sessionUser = useSelector((state) => state.session.user);
  console.log("sessionUser", sessionUser)
  const userInfo = useSelector((state) => state.reviews)
  const userArr = Object.values(userInfo)
  console.log(userArr)


  useEffect(() => {
    dispatch(getSpotReviews(spot?.id));
  }, [dispatch, spot?.id]);


  if (!reviews.length) {
    return <p>No reviews yet</p>;
  }


return (
  <div className="reviews_div">
  {reviews && (
    <>
      {reviews.map((review) => (

        <div key={review.id} className="ind-review">
          <div className="review-list-rating">
        <i className="fas fa-user-circle user_icon"> {reviews.User}</i>

            <div className="star-info">
              {/* <i className="fa-solid fa-star"></i> */}
              <p>{review.stars} out of 5 stars</p>
            </div>
            <div className="review-content">Message: "{review.review}"</div>
          </div>
          <div></div>
          <br></br>
        </div>
      ))}
    </>
  )}
</div>
);
}


export default SpotReviews;
