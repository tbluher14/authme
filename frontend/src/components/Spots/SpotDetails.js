import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findSpotById, deleteSpotById } from "../../store/spot";
import SpotReviews from "../Reviews/SpotReviews";
import StarReviews from "../Reviews/StarReviews";
import starImage from '../Reviews/StaticAssets/starImage.png'
import './SpotDetails.css'

const SpotDetails = ({ passedSpotId, hideButtons }) => {
  let { spotId } = useParams();
  if (!spotId) {
    spotId = passedSpotId;
  }
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spots[spotId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded]= useState(false)


  useEffect((e) => {

    dispatch(findSpotById(spotId))
    .then( () => setIsLoaded(true));

  }, [dispatch, spotId]);

  const removeSpot = (spotId) => async (e) => {
    e.preventDefault();
    const result = dispatch(deleteSpotById(spotId));
    history.push("/");
    return result

  };

  if (!isLoaded) {return null}
  return isLoaded && (
    <div className="spot_details">
      <div key={spot?.id} className='details_container'>
        <h3 className="spot_headline">{spot?.name}</h3>
        <div className="avg_rating">
          <img
          src={starImage}
          alt='starImage'
          className="starImage"
          /> <StarReviews spot={spot}/>
        <h4 className="spot_location_details">
          {spot?.city}, {spot?.state}
        </h4>
        </div>
        <div>
          {sessionUser ? (
            <>
              {!hideButtons && sessionUser?.id === spot?.ownerId && (
                <div>
                  <NavLink to={`/spots/${spotId}/edit`}>
                    <button className="edit_button_2">Edit My Spot</button>
                  </NavLink>
                  <button className='edit_button_2'onClick={removeSpot(spotId)}>Delete</button>
                </div>
               )}
               </>
              ) : (
                <></>
                )}
        </div>
        <br></br>
        <div className="spot_info_details">
                <img
                  src={spot?.previewImage}
                  alt="spot_preview_image"
                  className="spot_image"

                ></img>

          </div>
          <div className="host_info">{}</div>
          <div className="description">{spot?.description}</div>
          <div className="price_per_night" >
            Price: ${spot?.price}/night
        </div>
            <div className="review_average">
              Review Average: <StarReviews spot={spot} /> out of 5
            </div>
        <div className="spot_reviews">
          <h2>Reviews</h2>
          <div className="individual_review">
          <SpotReviews spot={spot} />
          </div>
              <NavLink to={`/spots/${spotId}/createReview`}>
                <button className="review_button">Create Review</button>
              </NavLink>

        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
