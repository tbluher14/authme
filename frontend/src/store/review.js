import { csrfFetch } from "./csrf";

const FIND_SPOT_REVIEWS = "spot/FIND_SPOT_REVIEWS";
const FIND_MY_REVIEWS = "spot/FIND_MY_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const findSpotReviews = (payload) => {
  return {
    type: FIND_SPOT_REVIEWS,
    payload,
  };
};

const findMyReviews = (payload) => {
  return {
    type: FIND_MY_REVIEWS,
    payload,
  };
};

const createAReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

const deleteAReview = (payload) => {
  return {
    type: DELETE_REVIEW,
    payload,
  };
};


export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  console.log('getspotreviews in store', response)
  if (response.ok) {
    const data = await response.json();
    dispatch(findSpotReviews(data));
    return data;
  }
};



const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_SPOT_REVIEWS: {
      newState = {};
      action.payload.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
