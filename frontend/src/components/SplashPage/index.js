import React, { useEffect, } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllSpots } from "../../store/spot";
import "./SplashPage.css";
import starImage from '../Reviews/StaticAssets/starImage.png'



const Homepage = () => {
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots);
  const allSpots = Object.values(allSpotsObj); //changing to array to .map
  // const spotIds = allSpots.map(spot => spot.id)
  // console.log("all spots", allSpots)


  useEffect(() => {
    dispatch(listAllSpots());

  }, [dispatch]);

  if (!allSpots) return null;

  // const image = `<img src={starImage} alt='starimage' className="star_image"/>`

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
                <h3 className="spot_location">
                  {ele.city}, {ele.state}
                </h3>
                <div className="spot_rating" id="star_review_score">

                  <img
                  src={starImage}
                  alt='starimage'
                  className="star_image"/>
                  <div className="rating_tern">
                  {ele?.avgRating === undefined ? "No Reviews Yet!" : `${ele.avgRating} / 5`}
                  </div>
                  <div>

                  </div>
                </div>
                <p className="spot_price">${ele.price}</p>
                <p className="per_night">  / night</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
