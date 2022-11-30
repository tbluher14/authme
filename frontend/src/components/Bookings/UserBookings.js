import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { findAllBookingsThunk } from "../../store/bookings"
import {listAllSpots} from '../../store/spot'




const UserBookings = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings)
    const bookingsArr = Object.values(bookings)
    const filteredBookings = bookingsArr.filter(booking => booking?.userId === sessionUser?.id)
    const spots = useSelector(state => state.spots)
    let filteredSpots = filteredBookings.map(booking => spots[booking?.spotId])
    const bookingDates = filteredBookings.map(booking =>  [booking?.startDate, booking?.endDate])
    // console.log("this is booking dates", [filteredSpots,bookingDates])
    const combinedObj = {bookingDates, filteredSpots}
    console.log("this is combinedObj", combinedObj)

    const combineArrs = () => {
        for (let i = 0; i < filteredSpots.length; i++) {
            filteredSpots[i].startDate = bookingDates[i][0]
            filteredSpots[i].endDate = bookingDates[i][1]
        }
        return filteredSpots
    }

    console.log(combineArrs())

    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        dispatch(findAllBookingsThunk())
        dispatch(listAllSpots())
        setIsLoaded(true)
    }
    , [dispatch])

    return isLoaded && (
            <>
              <div className="all_spots">

                {combineArrs().map((ele) => (
                  <Link
                    to={`/spots/${ele?.id}`}
                    key={ele?.id}
                    className="single_spot"
                  >
                    <div key={ele.id}>
                      <div className="img">
                        <img
                          src={ele.previewImage}
                          alt={ele.name}
                          className="spot_image_display"
                        ></img>
                      </div>
                      <div className="spot_details">
                      <div className="spot_info">
                        <h3 className="spot_location">
                          {ele.city}, {ele.state}
                        </h3>
                        <div className="rating_star_container">
                        <i className="star_img" class="fa-solid fa-star" id="splash_page_star">
                          </i>
                        <div className="spot_rating" id="star_review_score">
                          <div className="rating_tern">
                          {ele?.avgRating === undefined ? "New!" : `${ele.avgRating} / 5`}
                          </div>
                          </div>
                      </div>
                        </div>
                        <p className="spot_price">${ele.price} / night</p>
                        {/* <p className="booking_dates">{ele.startDate} - {ele.endDate}</p> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          );
        };


export default UserBookings
