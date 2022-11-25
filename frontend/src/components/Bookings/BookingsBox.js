import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { createBookingThunk, findAllBookingsThunk } from '../../store/bookings';
import  LoginFormModal  from '../LoginFormModal/index';
import { useEffect } from 'react';
import { listAllSpots } from '../../store/spot';


const CreateBooking = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} = useParams();

  // State Variables
  const spots = useSelector(state => state.spots);
  const bookings = useSelector(state => state.bookings);
  const sessionUser = useSelector(state => state.session.user);

  // Specific Spot Variables
  const spot = spots[spotId];
  const spotBookings = Object.values(bookings).filter(booking => booking.spotId === Number(spotId));

  // Input Variables
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  console.log("start date", startDate)
  console.log("end date", endDate)

  // Use Effect to bring down State
  useEffect(() => {
    dispatch(findAllBookingsThunk());
    dispatch(listAllSpots());
  }, [dispatch]);

  // Date Variables
  const today = new Date();
  const todayDate = format(today, 'yyyy-MM-dd');
  // const daysElapsed = -(new Date(startDate)).getTime() - new Date(endDate).getTime() / (1000 * 3600 * 24)).toFixed(0) + 1;

  const cleaningFee = (spot?.price / 10).toFixed(2);
  const serviceFee = (spot?.price/15).toFixed(2);
  // const total = (spot?.price * daysElapsed + Number(cleaningFee) + Number(serviceFee)).toFixed(2);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      spotId,
      startDate,
      endDate,
      userId: sessionUser.id,
    }
    const result = await dispatch(createBookingThunk(payload, spotId));
    if (result) {
      history.push(`/spots/${spotId}`);
    }
  }



return (
    <div className='booking_container'>
      <div className='booking_container_top'>
        <h2>Book Your Stay!</h2>
        <div className='booking_container_top_left'>
          <div className='booking-price-box'>
            <div className='booking-price-per-night'>
              {startDate && endDate ?
              // `${spot?.price} per night x ${daysElapsed.toFixed(0)} Nights = $${(spot?.price * daysElapsed)}
                `+
               $${cleaningFee} cleaning fee
                + $${serviceFee} service fee
                = $ before taxes
               `

              : `Enter Dates to See Price`
              }

            </div>
          </div>
          <div className='input-container'>
            <form onSubmit={handleSubmit}>
            <label className='form-label'>Start Date</label>
              <input className='input-container'
              name="Booking Start Date"
              type="date"
              value={startDate}
              disabled={spotBookings.length > 0}
              placeholder={todayDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              >
            </input>
            <label className='form-label'>End Date</label>
              <input className='input-container'
              name="Booking End Date"
              type="date"
              value={endDate}
              disabled={spotBookings.length > 0}
              placeholder="Start Date"
              onChange={(e) => setEndDate(e.target.value)}
              required
              >
            </input>
              <div className='create-booking-button-container'>
                <button className='create-booking-button' type='submit'>Book Now!</button>
             </div>
            </form>
          </div>
        </div>
        </div>
        </div>
      );
  };

    export default CreateBooking;
