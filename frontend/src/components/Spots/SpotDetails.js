import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findSpotById, deleteSpotById, clearState } from "../../store/spot";
import SpotReviews from "../Reviews/SpotReviews";
import StarReviews from "../Reviews/StarReviews";
import starImage from '../Reviews/StaticAssets/starImage.png'
import calendar from './staticAssets/calendar.png'
import medal from './staticAssets/medal.png'
import selfCheck from './staticAssets/selfcheck.png'
import {getSpotReviews} from '../../store/review'

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

  console.log("this is spot in spot details", spot)
  console.log('this is reviews in spot details', reviews)

  const sessionUser = useSelector((state) => state.session.user);
  // const [isLoaded, setIsLoaded]= useState(false)


  useEffect((e) => {
    dispatch(findSpotById(spotId))
    // dispatch(getSpotReviews(spotId))

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
          />
          <div className="stars_top">
          <StarReviews spot={spot}/>
          </div>
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
                  <button className='edit_button_3'onClick={removeSpot(spotId)}>Delete</button>
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

          {/* <div className="spot_description">{spot?.description}</div> */}
          <div className="amenities">Amenities:
          <div className="self_checkout_container">
          <img
          alt={'selfcheckpick'}
          className="selfcheckpic"
          src={selfCheck}
          />
          <h3>Self check-in</h3>
          <h5 className="checkInInfo">Check yourself in with the lockbox</h5>
          </div>
          <div className="medal_container">
          <img
          className="medalpic"
          alt={'medalpick'}
          src={medal}
          />
          <h3>Owner is a Superhost</h3>
          <h5 className="checkInInfo">Superhosts are experienced, highly rated hosts </h5>
          </div>
          <div className="calendar_container">
          <img
          className="calendarpic"
          src={calendar}
          alt={'calendarpick'}

          />
          <h3>Free cancellation before March 21</h3>
          <h5 className="calendarInInfo">No cancellation fees</h5>
          </div>

          </div>
          <div className='price_box'>

            <h2 className="price_in_box">
             ${spot?.price}/night
            </h2>
            <a
            href={'https://github.com/tbluher14'}
            className={'reserve_button'}
            target="_blank"
            >
              Meet the Author!
            {/* <button className="reserve_button">Meet The Author!</button> */}
             </a>
            <div className="price_calculator">
              <div className="price_calculator_left">
                 <ul>
                  <p>${spot?.price} x 5 nights </p>
                  <p>Cleaning Fee:</p>
                  <p>Service Fee: </p>
                 </ul>
                 </div>
                 <div className="price_calculator_right">
                 <ul>
                  <p> ${(spot?.price * 5).toFixed(2)}</p>
                  <p>$95.00</p>
                  <p>$207.00</p>
                 </ul>
                 </div>
            </div>
                 <div className="total">Total Before Taxes: ${((spot?.price *5) + 95 +207).toFixed(2)}</div>
          </div>
          </div>
          <div className="spot_description">
          <div className="spot_description">{spot?.description}</div>
          </div>
        <div className="bottom_page_review_container">
          <div className="reviews_header">
          <h2>Reviews</h2>
          </div>
            <h3>
            Average Review:
              </h3>
          <div className='bottom_stars_reviews'>
            <img
            src={starImage}
            alt='starImage'
          className="starImage_bottom_page"
          />
          <div>
          <StarReviews spot={spot}/>
          </div>
            {/* {spot?.avgRating? `${spot.avgRating} Stars! ` :  `No Reviews Yet!`} */}
            </div>
          <div>
          <SpotReviews spot={spot} />
          </div>
              <NavLink to={`/spots/${spotId}/createReview`}>
                <button className="spot_details_review_button">Create Review</button>
              </NavLink>
        </div>
        </div>
        </div>


  );
};

export default SpotDetails;
