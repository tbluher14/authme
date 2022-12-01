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
                  onError={e => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1546593064-053d21199be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80"
                  }}
                ></img>
              </div>
              <div className="spot_details">
              <div className="spot_info">
                <h3 className="spot_location">
                  {ele.city}, {ele.state}
                </h3>
                <div className="rating_star_container">
                <i className="star_img" class="fa-solid fa-star" id="splash_page_star">
                  </i>
                <div className="spot_rating" id="star_review_score">
                  <div className="rating_tern">
                  {ele?.avgRating === undefined ? "New!" : `${ele.avgRating} / 5`}
                  </div>
                  </div>
              </div>
                </div>
                <p className="spot_price">${ele.price} / night</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
