const SEARCH_SPOT = 'spots/SEARCH_SPOT';


export const searchSpotAC = (spots) => ({
  type: SEARCH_SPOT,
  payload: spots,
})

// search thunk
export const searchSpotThunk = (name) => async (dispatch) => {
  const res = await fetch(`/api/spots/search?name=${name}`)
  if (res.ok) {
      const spots = await res.json()
      dispatch(searchSpotAC(spots))
      return res
  }
}

const intialState = {};
const querySpotReducer = (state = intialState, action) => {
  let newState = {...state}
  switch (action.type){
    case SEARCH_SPOT:
      newState = {}
      action.payload.spots.forEach(spot => {
        newState[spot.id] = spot
      })
      return newState;
    default:
      return state
  }
}

export default querySpotReducer;
