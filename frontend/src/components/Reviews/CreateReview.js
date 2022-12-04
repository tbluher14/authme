import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createNewReview, getSpotReviews } from "../../store/review";
import { listAllSpots } from "../../store/spot";
import './CreateReview.css'


const ReviewForm = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);

  const reviews = useSelector((state) => state.reviews);
  const sessionUser = useSelector((state) => state.session.user);


  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState("Rating");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  const userHasAReview = Object.values(reviews).filter(review => review.userId === sessionUser.id && review.spotId === spotId).length > 0


  useEffect(() => {
    dispatch (listAllSpots())
    dispatch(getSpotReviews(spotId))
  }, [dispatch, spotId])

  useEffect(()=> {
    const errors = []
    if (reviewMessage.length === 1 || reviewMessage.length  > 255 || reviewMessage.length === 0) {
        errors.push('Please enter a review between 2 and 255 characters.')
    }
    if (stars>5 || stars < 1) {
        errors.push('Please enter a rating between 1 and 5.')
    }
    setErrors(errors)
  }, [reviewMessage, stars])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (errors.length === 0){
      let data = {
        review: reviewMessage,
        stars: stars,
      };

      if (reviewMessage.length >= 1 && reviewMessage.length <= 255) {
        const awaitedReview = await dispatch(createNewReview(data, spotId));
        dispatch(getSpotReviews(spotId));
        setReviewMessage("")
        setSubmitted(false)
      }
    }
  };

  return !userHasAReview && (
    <form onSubmit={handleSubmit} className="create_review">

      <h2 className="review_welcome_header">Create A Review:</h2>
      <ul className="errors_review_submit">
          {submitted && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
        ))}

      </ul>
        <label className="review_stars_container">
          <span className='review_stars_text'>Stars:</span>
          <input
            type="number"
            placeholder="Rating"
            className="review_rating_input"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
          </label>
      <label className="review_stars_container">
        <span className="review_stars_text"> Message: </span>
        <textarea
          type="textarea"
          placeholder="Review Message"
          className="review_text_input"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="review_submit">Create Review</button>
    </form>
  );
};

export default ReviewForm;
