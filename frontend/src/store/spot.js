import { csrfFetch } from "./csrf";

// Actions
const CREATE_SPOT = "spots/CREATE_SPOT";
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const FIND_SPOT= "spots/FIND_SPOT";
const FIND_MY_SPOTS= "spots/FIND_MY_SPOTS";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";


const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

const findSpot = (spot) => ({
  type: FIND_SPOT,
  spot,
});

const findMySpots = (currentUserSpots) => ({
  type: FIND_MY_SPOTS,
  currentUserSpots,
});

const editSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});


const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  spot,
});

// _____________________________________________________________
// Thunks

// Find all users spots
export const getCurrentUsersSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`);
    console.log("response from fetch",response)
    if (response.ok) {
      const spotsObj = await response.json();

      dispatch(findMySpots(spotsObj));
      return response
    }
    return response;
  };

// Store
const initialState = {};
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS: {
      newState = {};
      action.spots.forEach(
        (spot) => (newState[spot.id] = spot)
      );
      return newState;
    }
    case FIND_MY_SPOTS: {
        newState = {};
        action.currentUserSpots.forEach(spot=> newState[spot.id] = spot);
        let allSpots = {...newState};
        return allSpots;
      }

    default:
      return state;
  }
};

export default spotReducer;
