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
export const findAllBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings');
    if (response.ok) {
        const data = await response.json();
        dispatch(findAllBookingsAC(data));
    }
}


