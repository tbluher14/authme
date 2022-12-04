import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createBookingThunk } from '../../store/bookings'
import { getBookingsBySpotIdThunk } from '../../store/bookings'
import { useEffect } from 'react'
import "../Spots/SpotDetails2.css"

const CreateBooking = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()

  // *************************************************************************
  // State Variables
  const spots = useSelector(state => state.spots)
  const bookings = useSelector(state => Object.values(state.bookings))
  const sessionUser = useSelector(state => state.session.user)
  const [submitted, setSubmitted] = useState(false)

  // Input Variables
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errors, setErrors] = useState([])

// ************************************************************************************
// Error Handling for booking:
  const spot = spots[spotId]
  const cleaningFee = (spot?.price / 2)
  const serviceFee = (spot?.price / 15)
  const startDateNum = new Date(startDate) - 0
  const endDateNum = new Date(endDate) - 0
  // const totalDays = () => {
  //   if (startDateNum && endDateNum) {
  //     return (startDateNum && endDateNum) (endDateNum - startDateNum) / 86400000
  //   }
  // }
  // const totalCost = (totalDays * spot?.price) + serviceFee + cleaningFee
  const validations = () => {
        let errors = []

        bookings?.map((booking) => {
          let bookedStartDate = (new Date(booking?.startDate) - 0)
          let bookedEndDate = (new Date(booking?.endDate) - 0)

          if (startDateNum >= endDateNum) {
            errors.push('Checkout cannot be the same as or before Check-in')
          }
          if (
          (startDateNum === bookedStartDate) ||
          (startDateNum === bookedEndDate) ||
          (endDateNum === bookedStartDate) ||
          (endDateNum === bookedEndDate) ||
          ((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) ||
          ((startDateNum > bookedStartDate) && (startDateNum < bookedEndDate)) ||
          ((startDateNum < bookedStartDate) && (endDateNum > bookedStartDate) && (endDateNum < bookedEndDate)) ||
          ((startDateNum < bookedStartDate) && (endDateNum > bookedEndDate))
          )
          {
            errors.push('This spot is unavailable for the selected dates')
          }
          return setErrors(errors)
        })
      }

  // Use Effect for Error Handling
    useEffect(() => {
      dispatch(getBookingsBySpotIdThunk(spotId))
      validations()
      }, [startDateNum, endDateNum])

  let errorsLi;

  if (errors.length>0){
    errorsLi = (
      <div className='createBookingErrors'>
        {(errors).map((error, i) => (
          <div className="errorMessageContainer" key={i}>
            <div className="errorMessage">{error}</div>
          </div>
        ))}
      </div>
    )
  }

  // ************************************************************************************
  // Form Submission
  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitted(true)

    if (errors.length === 0) {
    const payload = {
      spotId: Number(spotId),
      startDate,
      endDate,
      userId: sessionUser.id
    }

    const result = await dispatch(createBookingThunk(payload))
    .then(history.push(`/bookings/current`))
    .then(setErrors([]))

  }
  }

  // ************************************************************************************
  return (
    <div className='booking_container'>
      <div className='booking_container_top'>
        <h2 className='booking_box_header'>Book Your Stay!</h2>
        <div className='booking_container_top_left'>
          <div className='booking-price-box'>
            {/* <div className='booking-price-per-night'>
              {startDate && endDate
                ?
                `${spot?.price} per night x ${totalDays.toFixed(0)} Nights = $${(spot?.price * totalDays)}`
                 `+ ${cleaningFee} cleaning fee`
                `+ $${serviceFee} service fee`
                `= $${totalCost} before taxes`

                : `Enter Dates to See Price`}
            </div> */}
          </div>
          <div className='input-container'>
            <form onSubmit={handleSubmit}>
              <div className='CreateBookingErrorContainer'>
                {errorsLi}
              </div>
              <label className='form-label'>Start Date</label>
              <input
                className='input-container'
                name='Booking Start Date'
                type='date'
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              ></input>
              <label className='form-label'>End Date</label>
              <input
                className='input-container'
                name='Booking End Date'
                type='date'
                value={endDate}
                placeholder='Start Date'
                onChange={e => setEndDate(e.target.value)}
                required
              ></input>
              <div className='create-booking-button-container'>
                <button className='create-booking-button' type='submit'>
                  Book Now!
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBooking
