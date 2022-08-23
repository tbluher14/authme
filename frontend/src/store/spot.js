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

const findSpot = (spots) => ({
  type: FIND_SPOT,
  spots
})


const findMySpots = (currentUserSpots) => {
    const typeAndAction = { type: FIND_MY_SPOTS, currentUserSpots}
    return typeAndAction
}

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

// Create Spot
export const createNewSpot = (data) => async (dispatch) => {

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    return spot;
  }
};

// Find all users spots
export const getCurrentUsersSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`);
    console.log("response from fetch", response)
    if (response.ok) {
      const spotsObj = await response.json();
        console.log("spotsObj in thunk", spotsObj)
      dispatch(findMySpots(spotsObj));

      return response
    }
    return response;
  };

// Get all Spots
export const listAllSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);
  if (response.ok) {
    const spotsObj = await response.json();

    dispatch(getAllSpots(spotsObj.spots));
    return response;
  }
};

// Find spot by ID
export const findSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(findSpot(spot))
    return spot
  }
}


// Edit a Spot
export const editASpot = (data) => async (dispatch) => {
  const {
    id,
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = data;
  const response = await csrfFetch(`/api/spot/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    }),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(editSpot(updatedSpot));
    return updatedSpot;
  }
};

export const deleteSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    body: JSON.stringify({
      spotId: spotId
    })
  })
  if (response.ok){
    const deletedSpot = await response.json()
    dispatch(deleteSpot(spotId))
    return deletedSpot
  }
}

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
        newState = {state};
        action.currentUserSpots.forEach(spot=> newState[spot.id] = spot);
        let allSpots = {...newState};
        return allSpots;
      }
    case CREATE_SPOT: {
      newState = {...state}
      newState[action.spot.id]= action.spot
      return newState
    }
    case UPDATE_SPOT: {
      newState={...state}
      newState[action.spot.id] = action.spot
      return newState
    }
    case DELETE_SPOT: {
      newState ={...state}
      delete newState[action.spotId]
      return newState
    }
    default:
      return state;
  }
};

export default spotReducer;
