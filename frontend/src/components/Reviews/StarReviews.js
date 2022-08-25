import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/review";

function StarReviews({spot }) {
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(null)


  useEffect(() => {
    async function fetchData() {
      //no spot id
      if (!spot?.id) return
      //get reviews
      const response = await dispatch(getSpotReviews(spot?.id));

      if (!response?.length) {
        return setAvgRating('New')
      }
      // get average and set
      const sum = response.reduce((acc, review) => (review?.stars ?? 0) + acc, 0)
      const avg = (sum/response.length).toFixed(2)
      setAvgRating(avg)
    }
    fetchData();
  }, [dispatch, spot?.id]);

  return (
    <>
      <>
        {/* <i className="fa-solid fa-star"></i> */}
        {/* <span className="avg-rating"> */}
          {avgRating}
        {/* </span> */}
      </>
    </>
  );
}

export default StarReviews;
