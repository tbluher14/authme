import React, { useEffect, useState } from 'react'
import { useParams, useHistory, NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { findSpotById, deleteSpotById, listAllSpots } from '../../store/spot'
import { getAllReviewsThunk, getSpotReviews } from '../../store/review'
import SpotReviews from '../Reviews/SpotReviews'
import ReviewForm from '../Reviews/CreateReview'
import CreateBooking from '../Bookings/BookingsBox'
import LoginFormModal from '../LoginFormModal'
import './SpotDetails2.css'

const SpotDetails = ({ passedSpotId, hideButtons }) => {
  let { spotId } = useParams()
  if (!spotId) {spotId = passedSpotId}
  spotId = Number(spotId)


  const dispatch = useDispatch()
  const history = useHistory()

  const spot = useSelector(state => state.spots[spotId])
  const reviews = useSelector(state => state.reviews)
  const sessionUser = useSelector(state => state.session.user)

  const reviewsArr = Object.values(reviews)
  const filteredReviews = reviewsArr.filter(review => review.spotId === spotId)
  const [isLoaded, setIsLoaded] = useState(false)


  const averageReview = (reviewsArr) => {
    let total = 0
    let count = 0
    if (reviewsArr.length>0){
      reviewsArr.forEach(review => {
        total += review.stars
        count++
      })
    }
    else { return "New"}
    return (total / count).toFixed(1)
  }


  useEffect(
    e => {
      dispatch(findSpotById(spotId))
      dispatch(getAllReviewsThunk())
    },
    [dispatch, spotId]
  )

  const removeSpot = spotId => async e => {
    const alert = window.confirm('Are you sure you want to delete this spot?')
    if (alert) {
    e.preventDefault()
    history.push('/')
    const result = await dispatch(deleteSpotById(spotId))
    .then(dispatch(listAllSpots()))
    .then(setIsLoaded(false))
    }
  }

  const openLoginModal = () => {
    return <LoginFormModal/>
  }

  return (
    <div className='page_container'>
      <div className='content_container'>
        <div key={spot?.id}>
          <div className='header_container'>
            <div className='header_container_top_half'>
              <h3 className='spot_headline'>{spot?.name}</h3>
            </div>
            <div className='header_container_bottom_half'>
              <div className='stars_top'>
                <i
                  className='starImage'
                  class='fa-solid fa-star'
                  id='spot_details_star'
                />
                {}
                {/* <StarReviews spot={spot} /> */}
                {averageReview(reviewsArr)}
              </div>
              <h4>
                {spot?.city}, {spot?.state}
              </h4>
            </div>
            <div className='header_container_bottom_half_edit_delete'>
              {sessionUser ? (
                <>
                  {!hideButtons && sessionUser?.id === spot?.ownerId && (
                    <div>
                      <NavLink to={`/spots/${spotId}/edit`}>
                        <button className='edit_button_2'>Edit My Spot</button>
                      </NavLink>
                      <button
                        className='edit_button_3'
                        onClick={removeSpot(spotId)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            {spot?.Images ? (
              <img
                src={spot?.Images[spot.Images.length - 1]}
                alt='spot_preview_image'
                className='spot_image'
                onError={e => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1546593064-053d21199be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80"
                }}
              >
                {' '}
              </img>
            ) : (
              <img
                src={spot?.previewImage}
                alt='spot_preview_image'
                className='spot_image'
                onError={e => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1546593064-053d21199be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80"
                }}
              ></img>
            )}
          </div>
        </div>
        <div className='bottom_half_price_description'>
          <div className='amenities'>
            <div className='self_checkout_container'>
              <i class='fa-solid fa-door-open' id='door'></i>
              <h3 className='self_check'>Self check-in</h3>
              <h5 className='checkInInfo'>
                Check yourself in with the lockbox
              </h5>
            </div>
            <div className='medal_container'>
              <i class='fa-solid fa-medal' id='medal'></i>
              <h3 className='superhost'>Owner is a Superhost</h3>
              <h5 className='shinfo'>
                Superhosts are experienced, highly rated hosts{' '}
              </h5>
            </div>
            <div className='calendar_container'>
              <i class='fa-regular fa-calendar' id='calendar'></i>
              <h3 className='cancelation'>Free cancellation before March 21</h3>
              <h5 className='calendarInInfo'>No cancellation fees</h5>
            </div>
          </div>
          <div className='price_box'>
            <CreateBooking />
          </div>
        </div>
        <div className='spot_description'>
          <div className='spot_description'>{spot?.description}</div>
        </div>
        <div className='bottom_page_review_container'>
          <div className='reviews_header'>
            <h2 className='reviews_header'>Reviews</h2>
          </div>
          <div className='bottom_stars_reviews'>
          <h3>Average Review:</h3>
              <i
                className='starImage'
                class='fa-solid fa-star'
                id='avg_review_star'
              />
              <div className='review_average_number'>
                {averageReview(filteredReviews)}
                </div>
          </div>
          <div>
            {filteredReviews.map(review => (
              <div className='review_container'>
                <SpotReviews
                  review={review}
                  spot={spot}
                  key={review.id}
                />
              </div>
            ))}
          </div>
          </div>
        <div className='create-review-spot-details'>
        {sessionUser ? (
          sessionUser && <ReviewForm spot={spotId} />
        ) : (
          <div className='logged-out-review-container'>

          <div onClick={() => openLoginModal}>Login to leave a review!
          </div>

          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default SpotDetails
