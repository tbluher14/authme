import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createNewReview } from "../../store/review";
import './CreateReview.css'


const ReviewForm = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      review: reviewMessage,
      stars: stars,
    };

    return dispatch(createNewReview(data, spotId))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.message) setErrors([data.message]);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="header">Create A Review:</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <label className="review_stars">
          Stars:
          <input
            type="number"
            placeholder="Rating"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
          </label>
      <label className="review_message">
        Message:
        <input
          type="text-area"
          placeholder="Review Message"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="submit">Create Review</button>
    </form>
  );
};

export default ReviewForm;
