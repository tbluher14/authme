import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, editReview, getAllReviewsThunk, getSpotReviews } from "../../store/review";
import { getAllUsersThunk } from "../../store/session";
import "./SpotReviews.css";

function SpotReviews({ review, spot }) {
  const dispatch = useDispatch();
  const reviewsObj = useSelector((state) => state.reviews)
  const reviews = Object.values(reviewsObj);
  const sessionUser = useSelector((state) => state.session.user);
  // const filteredReviews = reviews.filter((review) => review.spotId === spot.id);

  console.log("this is review prop", review)

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
    dispatch(getAllReviewsThunk())

  }, [dispatch]);


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

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure you want to delete this review?")

    if (confirm){
      await dispatch(deleteReview(review?.id));
    dispatch(getSpotReviews(spot.id));
  }
}

  return (
    <div>
      <div className="review_button_container">
    {!editing && sessionUser && sessionUser?.id === review?.userId && (
      <button className='edit-review-button' onClick={() => setEditing(true)}>Edit</button>
      )}
    {!editing && sessionUser && sessionUser?.id === review?.userId && (
      <button className='delete-review-button' onClick={handleDelete}>Delete</button>
      )}
      </div>
    {editing ?
    <div>
      <h4 className="edit_review_header">Edit Your Review</h4>

        <form onSubmit={handleSubmit}>
          <input
          className="edit-stars-field"
          value={stars}
          type="number"
          onChange={(e) => setStars(e.target.value)}
          placeholder="Edit your rating"
          required
          />
          <textarea
          className="edit-review-field"
          type="text"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          placeholder="Edit your review"
          required
          />

        <div>
          {submitted && errors.map(errors => (
            <div className='editing_errors'>{errors}</div>
            ))}
        </div>
        <button className="edit-form-button" type="submit">Submit</button>
      </form>
    </div>
      :
      <div>
      <div className="review_card_username">{review?.User?.username}</div>
      <div className="review_text_container">
      <div className="review_stars">
      <i
        className='starImage'
        class='fa-solid fa-star'
        id='spot_details_star'
      />
      {review?.stars}
      </div>
        <div className="review_text">
      {review?.review}
      </div>
      </div>
      </div>
    }
      </div>
  )
}

export default SpotReviews;
