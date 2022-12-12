import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllSpots } from "../../store/spot";
import "./SplashPage.css";
import starImage from '../Reviews/StaticAssets/starImage.png'
import Footer from "./footer";



const Homepage = () => {
  const dispatch = useDispatch();
  const allSpotsObj = useSelector((state) => state.spots);
  const allSpots = Object.values(allSpotsObj); //changing to array to .map
  const [filter, setFilter] = useState("");
  console.log(filter)
  // console.log(allSpots)

  const oneSpot = allSpots.map(ele => ele.tags)
  console.log("this is one spot", oneSpot)


  // const handleFilter = () => {
  //   if (filter === "" && allSpots) {
  //     return allSpots;
  //   } else {
  //     return allSpots?.filter((ele) =>
  //       if (ele?.tags.length > 0){
  //         console.log(ele?.tags, "this inside the filter0"))
  //     }

  //     // ele?.tags == filter);
  //   }
  // }

  // console.log('this is handle filter', handleFilter())


  useEffect(() => {
    dispatch(listAllSpots());
  }, [dispatch]);

  if (!allSpots) return null;

  return (
    <>
      <div className="all_spots">
        <div className="category_container">
          <div className="category">
            <h3 className="category_title" onClick={() => setFilter(`\"Cabin\"`)}
              >Cabin</h3>
            </div>
            </div>
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
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
