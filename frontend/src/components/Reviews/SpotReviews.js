import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from "../../store/review";


function SpotReviews({ spot }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  console.log("reviews:", reviews);


  useEffect(() => {
    dispatch(getSpotReviews(spot.id));
  }, [dispatch, spot.id]);

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

return (
    <div>{reviews}</div>
)
}

export default SpotReviews;
