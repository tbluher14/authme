import {csrfFetch} from './csrf'
const FIND_ALL_BOOKINGS = 'bookings/FIND_ALL_BOOKINGS';
const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';


const findAllBookingsAC = (bookings) => {
    return {
        type: FIND_ALL_BOOKINGS,
        bookings
    }
}

const createBookingAC = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

const editBookingAC = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
    }
}

const deleteBookingAC = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
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
const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case FIND_ALL_BOOKINGS:
            newState = { ...state };
            action.bookings.forEach(booking => {
                newState[booking.id] = booking;
            });
            return newState;
        case CREATE_BOOKING:
            newState = { ...state };
            newState[action.booking.id] = action.booking;
            return newState;
        case EDIT_BOOKING:
            newState = { ...state };
            newState[action.booking.id] = action.booking;
            return newState;
        case DELETE_BOOKING:
            newState = { ...state };
            delete newState[action.bookingId];
            return newState;
        default:
            return state;
    }
}

export default bookingsReducer;
