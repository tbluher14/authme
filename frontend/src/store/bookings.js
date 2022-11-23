import {csrfFetch} from './csrf'
const FIND_ALL_BOOKINGS = 'bookings/FIND_ALL_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const findAllBookingsAC = (payload) => {
    return {
        type: FIND_ALL_BOOKINGS,
        payload
    }
}

const createBookingAC = (payload) => {
    return {
        type: CREATE_BOOKING,
        payload
    }
}

const editBookingAC = (payload) => {
    return {
        type: EDIT_BOOKING,
        payload
    }
}

const deleteBookingAC = (payload) => {
    return {
        type: DELETE_BOOKING,
        payload
    }
}

// Thunks
// Find all bookings
export const findAllBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings');
    if (response.ok) {
        const data = await response.json();
        dispatch(findAllBookingsAC(data));
    }
}

// Create a booking based on spot id
export const createBookingThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createBookingAC(data));
    }
}

// Edit a booking based on booking id
export const editBookingThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editBookingAC(data));
    }
}

// Delete a booking based on booking id
export const deleteBookingThunk = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${payload.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBookingAC(data));
    }
}


// Reducer
const initialState = {};
