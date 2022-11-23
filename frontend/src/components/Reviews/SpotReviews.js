import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, editReview, getSpotReviews } from "../../store/review";
import "./SpotReviews.css";

function SpotReviews({ review, spot }) {
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => state.reviews)
  const reviews = Object.values(reviewsObj);
  const sessionUser = useSelector((state) => state.session.user);

  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let errors = []
    if (reviewMessage.length === 1 || reviewMessage.length > 255 || reviewMessage.length === 0) {
      errors.push('Please enter a review between 2 and 255 characters.')
    }
    setErrors(errors)
  }, [reviewMessage])


  useEffect(() => {
    dispatch(getSpotReviews(spot?.id));
  }, [dispatch, spot?.id]);


  if (!reviews.length) {
    return <p>No reviews yet</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (errors.length === 0) {
      let data = {
        review: reviewMessage,
        stars: stars,
      };
      if (reviewMessage.length > 1 && reviewMessage.length <= 255) {
        const awaitedReview = await dispatch(editReview(review?.id, data));
        dispatch(getSpotReviews(spot.id));
        setEditing(false);
      }
    }
  }

  return (
    <div>
    {!editing && sessionUser && sessionUser?.id === review?.userId && (
      <button className='edit-review-button' onClick={() => setEditing(true)}>Edit</button>
      )}
    {!editing && sessionUser && sessionUser?.id === review?.userId && (
      <button className='delete-review-button' onClick={() => dispatch(deleteReview(review?.id))}>Delete</button>
      )}
    {editing ?
        <form onSubmit={handleSubmit}>
          <textarea
          className="form-field"
          type="text"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          placeholder="Edit your review"
          required
          />
          <input
          className="form-field"
          value={stars}
          type="number"
          onChange={(e) => setStars(e.target.value)}
          placeholder="Edit your rating"
          required
          />

        <div>
          {submitted && errors.map(errors => (
            <div className='errors'>{errors}</div>
            ))}
        </div>
        <button className="form-button" type="submit">Submit</button>
      </form>
      :
      <div>
      {review?.review}
      {review?.stars}
      </div>
    }
      </div>
  )
}

export default SpotReviews;
