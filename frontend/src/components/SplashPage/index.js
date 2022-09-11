import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllSpots } from "../../store/spot";
import "./SplashPage.css";
import StarReviews from "../Reviews/StarReviews";
import { findSpotById } from "../../store/spot";
// import StarReviews from "../Reviews/StarReviews";
import { getSpotReviews } from "../../store/review";

const Homepage = () => {
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots);
  const allSpots = Object.values(allSpotsObj); //changing to array to .map
  const spotIds = allSpots.map(spot => spot.id)
  


  useEffect(() => {
    dispatch(listAllSpots());

  }, [dispatch]);

  if (!allSpots) return null;

  return (
    <>
      <div className="all_spots">

        {allSpots.map((ele) => (
          <Link
            to={`/spots/${ele.id}`}
            key={ele.id}
            className="single_spot"
          >
            <div key={ele.id}>
              <div className="img">
                <img
                  src={ele.previewImage}
                  alt={ele.name}
                  className="spot_image_display"
                ></img>
              </div>
              <div className="spot_info">
                <h4 className="spot_location">
                  {ele.city}, {ele.state}
                </h4>
                <p className="spot_price"> Price: ${ele.price}/night</p>
                <div className="spot_rating" id="star_review_score">
                Review Average: <StarReviews spot={spotIds.map(spot => spot.id)} /> out of 5
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
