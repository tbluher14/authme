import { Link } from "react-router-dom";
import "../SplashPage/SplashPage.css"


const SpotCard = ({ spot }) => {

return (
    <Link
      to={`/spots/${spot.id}`}
      key={spot.id}
      className="single_spot"
    >
      <div key={spot.id}>
        <div className="img">
          <img
            src={spot.previewImage}
            alt={spot.name}
            className="spot_image_display"
            onError={e => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1546593064-053d21199be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80"
            }}
          ></img>
        </div>
        <div className="spot_details">
        <div className="spot_info">
          <h3 className="spot_location">
            {spot.city}, {spot.state}
          </h3>
          <div className="rating_star_container">
          <i className="star_img" class="fa-solid fa-star" id="splash_page_star">
            </i>
          <div className="spot_rating" id="star_review_score">
            <div className="rating_tern">
            {spot?.avgRating === undefined ? "New!" : `${spot.avgRating} / 5`}
            </div>
            </div>
        </div>
          </div>
          <p className="spot_price">${spot.price} / night</p>
        </div>
      </div>
    </Link>
)
}

export default SpotCard;
