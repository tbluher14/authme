import React, { useEffect, } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllSpots } from "../../store/spot";
import "./SplashPage.css";



const Homepage = () => {
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots);
  const allSpots = Object.values(allSpotsObj); //changing to array to .map
  // const spotIds = allSpots.map(spot => spot.id)
  console.log("all spots", allSpots)


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
                  <div>Review: {ele?.avgRating === undefined ? 0 : ele.avgRating}/5</div>
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
