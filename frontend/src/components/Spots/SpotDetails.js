import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findSpotById, deleteSpotById, clearState } from "../../store/spot";
import SpotReviews from "../Reviews/SpotReviews";
import StarReviews from "../Reviews/StarReviews";
import starImage from '../Reviews/StaticAssets/starImage.png'
import './SpotDetails2.css'

const SpotDetails = ({ passedSpotId, hideButtons }) => {
  let { spotId } = useParams();
  if (!spotId) {
    spotId = passedSpotId;
  }
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector ((state) => state.reviews)
  let reviewsExist = false

  const sessionUser = useSelector((state) => state.session.user);
  // const [isLoaded, setIsLoaded]= useState(false)


  useEffect((e) => {
    dispatch(findSpotById(spotId))

    // .then( () => setIsLoaded(true));

  }, [dispatch, spotId]);

  const removeSpot = (spotId) => async (e) => {
    e.preventDefault();

    const result = await dispatch(deleteSpotById(spotId))
    .then (async () => {
      // await dispatch(clearState())
    })

    history.push("/");
    return result

  };

  if (reviews.length>0){reviewsExist = true}


  // if (!isLoaded) {return null}
  return  (
    <div className="page_container">
      <div className="content_container">
      <div key={spot?.id}>
        <div className="header_container">
        <div className="header_container_top_half">
        <h3 className="spot_headline">{spot?.name}</h3>
        </div>
        <div className="header_container_bottom_half">
          <img
          src={starImage}
          alt='starImage'
          className="starImage"
          /> <StarReviews spot={spot}/>
        <h4>
          {spot?.city}, {spot?.state}
        </h4>
        </div>
        <div className='header_container_bottom_half_edit_delete'>
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
        </div>
        <div>
                {spot?.Images? (
                  <img
                  src={spot?.Images[spot.Images.length -1]}
                  alt="spot_preview_image"
                  className="spot_image"
                  >  </img>) :  ( <img
                    src={spot?.previewImage}
                    alt="spot_preview_image"
                    className="spot_image"
                    ></img>
                    )
                  }
          </div>
          </div>
          <div className="bottom_half_price_description">

          <div className="spot_description">{spot?.description}</div>
          <div className='price_box'>

            <h2 className="price_in_box">
             ${spot?.price}/night
            </h2>


            <div className="price_calculator">
                  ${spot?.price}/night * 5 = {spot?.price * 5}
            </div>
          </div>
          </div>
        <div className="bottom_page_review_container">
          <h2>Reviews</h2>
            <h3>
            Average Review:
              </h3>
          <div>
            <img
            src={starImage}
            alt='starImage'
          className="starImage_bottom_page"
          />
            {spot.avgRating ? `${spot.avgRating} Stars! ` :  `No Reviews Yet!`}
            </div>
          <div>
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
