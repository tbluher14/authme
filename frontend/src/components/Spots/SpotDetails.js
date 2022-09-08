import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findSpotById, deleteSpotById } from "../../store/spot";
import SpotReviews from "../Reviews/SpotReviews";
// import "./SpotDetails.css";
// import "../Reviews/SpotReviews.css"
// import SpotReviews from "../Reviews/SpotReviews";
import StarReviews from "../Reviews/StarReviews";

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

    history.push("/");
  };

  return (
    <div>
      <div key={spot?.id}>
        <h3>{spot?.name}</h3>
        <div>

        </div>
        <br></br>
        <h4>
          {spot?.city}, {spot?.state}
        </h4>
        <div>
          {sessionUser ? (
            <>
              {!hideButtons && sessionUser?.id === spot?.ownerId && (
                <div>
                  <NavLink to={`/spots/${spotId}/edit`}>
                    <button>Edit My Spot</button>
                  </NavLink>
                  <button onClick={removeSpot(spot.id)}>Delete</button>
                </div>
               )}
               </>
              ) : (
              <></>
          )}
        </div>
        <br></br>
        <div>
          <img
            src={spot?.previewImage}
            alt="spot_preview_image"

          ></img>
          <br></br>
          <p>{spot?.description}</p>
          <p >
            {" "}
            Price: ${spot?.price}/night
          </p>
        </div>
        <div>
          <div>
            <div>
              Review Average: <StarReviews spot={spot} /> out of 5
            </div>
            <div>
              <NavLink to={`/spots/${spotId}/createReview`}>
                <button>Create Review</button>
              </NavLink>
            </div>
          </div>
          <div>
          <SpotReviews spot={spot} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;
