import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createNewReview, getSpotReviews } from "../../store/review";
import { listAllSpots } from "../../store/spot";
import './CreateReview.css'


const ReviewForm = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  const errorsArr = Object.values(errors)



  useEffect(() => {
    dispatch (listAllSpots())
    dispatch(getSpotReviews(spotId))
  }, [dispatch, spotId])

  useEffect(()=> {
    const errors = []
    if (reviewMessage.length === 1 || reviewMessage.length  > 255 || reviewMessage.length === 0) {
        errors.push('Please enter a review between 2 and 255 characters.')
    }
    setErrors(errors)
  }, [reviewMessage])


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (errors.length === 0){
      let data = {
        review: reviewMessage,
        stars: stars,
      };

      if (reviewMessage.length >= 1 && reviewMessage.length <= 255) {
        const awaitedReview = dispatch(createNewReview(data, spotId));
        dispatch(getSpotReviews(spotId));
        setReviewMessage("")
        setSubmitted(false)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h2 className="review_welcome_header">Create A Review:</h2>
      <ul className="errors_review_submit">
          {submitted && errorsArr.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}

      </ul>
        <label className="review_stars_container">
          <span className='review_stars_text'>Stars:</span>
          <input
            type="number"
            placeholder="Rating"
            className="review_text_input"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
          </label>
      <label className="review_stars_container">
        <span className="review_stars_text"> Message: </span>
        <input
          type="text-area"
          placeholder="Review Message"
          className="review_text_input"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="review_submit">Create Review</button>
      </div>
    </form>
  );
};

export default ReviewForm;
