import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findSpotById, deleteSpotById } from "../../store/spot";
// import "./SpotDetails.css";
// import "../Reviews/SpotReviews.css"
// import SpotReviews from "../Reviews/SpotReviews";
// import StarReviews from "../Reviews/StarReviews";

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

  useEffect(() => {
    dispatch(findSpotById(spotId));
  }, [dispatch, spotId]);

  const removeSpot = (spotId) => async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotById(spotId));

    history.push("/currentUser/spots");
  };

  return (
    <div className="spot_details">
      <div className="detail_border" key={spot?.id}>
        <h3 className="spot_name">{spot?.name}</h3>
        <div className="avg_rating">
          {/* <StarReviews property={prop} /> */}
        </div>
        <br></br>
        <h4 className="specific_spot_location">
          {spot?.city}, {spot?.state}
        </h4>
        <div>
          {sessionUser ? (
            <>
              {!hideButtons && sessionUser?.id === spot?.ownerId && (
                <div>
                  <NavLink to={`/spot/${spotId}/edit`}>
                    <button className="button-23">Edit</button>
                  </NavLink>
                  <button onClick={removeSpot(spot.id)} className="button-23">Delete</button>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <br></br>
        <div className="specific_spot_info">
          <img
            src={spot?.previewImage}
            alt="spot_preview_image"
            className="specific_spot_image"
          ></img>
          <br></br>
          <p className="specific_spot_description">{spot?.description}</p>
          <p className="specific_spot_price">
            {" "}
            Price: ${spot?.price}/night
          </p>
        </div>
        <div className="spot_review_details">
          <div className="avg_rating_component_and_reviews">
            <div className="star_reviews_avg">
              Review Average:
              {/* <StarReviews property={prop} /> */}
            </div>
            <div className="create_review_button">
              <NavLink to={`/spot/${spotId}/createReview`}>
                <button className="button-23">Create Review</button>
              </NavLink>
            </div>
          </div>
          <div>
            {/* <SpotReviews property={prop} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
