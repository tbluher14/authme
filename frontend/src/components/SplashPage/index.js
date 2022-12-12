import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listAllSpots } from '../../store/spot'
import './SplashPage.css'
import Footer from './footer'

const Homepage = () => {
  const dispatch = useDispatch()
  const allSpotsObj = useSelector(state => state.spots)
  const allSpots = Object.values(allSpotsObj) //changing to array to .map
  const [filter, setFilter] = useState('')

  const handleFilter = () => {
    if (filter === '' && allSpots) {
      return allSpots
    } else {
      const filteredSpots = allSpots?.filter(
        ele =>
          ele.tagA === filter ||
          ele.tagB === filter ||
          (ele.tagA && ele.tagB) === filter
      )
      return filteredSpots
    }
  }

  useEffect(() => {
    dispatch(listAllSpots())
  }, [dispatch])

  if (!allSpots) return null

  return (
    <>
      <div className='category_container'>
        <div className='category'>
          <div className='individual_category'>
            <i
              class='fa-solid fa-list'
              onClick={() => setFilter('')}
              id='category_icon'
            >
              {' '}
            </i>
            <div className='category_text'
            onClick={() => setFilter('')}
            >All Spots</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-house'
              id='catergory_icon'
              onClick={() => setFilter('Cabin')}
            ></i>
            <div className='category_text'onClick={() => setFilter('Cabin')}>Cabin</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-mountain-sun'
              onClick={() => setFilter('Mountain')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Mountain')}
            >Mountains</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-tree'
              onClick={() => setFilter('Forest')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Forest')}
            >Forest</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-snowflake'
              onClick={() => setFilter('Close to Skiing')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Close to Skiing')}
            >Close to Skiing</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-moon'
              onClick={() => setFilter('Secluded')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Secluded')}
            >Secluded</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-wifi'
              onClick={() => setFilter('Wifi Available')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Wifi Available')}
            >Wifi</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-person-skiing'
              onClick={() => setFilter('Ski-In/Ski-Out')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Ski-In/Ski-Out')}
            >Ski-In/Ski-Out</div>
          </div>
          <div className='individual_category'>
            <i
              class='fa-solid fa-hot-tub-person'
              onClick={() => setFilter('Hot Tub')}
              id='catergory_icon'
            ></i>
            <div className='category_text'
            onClick={() => setFilter('Hot Tub')}
            >Hot Tub</div>
          </div>
        </div>
      </div>
      <div className='all_spots'>
        {handleFilter().map(ele => (
          <Link to={`/spots/${ele.id}`} key={ele.id} className='single_spot'>
            <div key={ele.id}>
              <div className='img'>
                <img
                  src={ele.previewImage}
                  alt={ele.name}
                  className='spot_image_display'
                  onError={e => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1546593064-053d21199be1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1550&q=80'
                  }}
                ></img>
              </div>
              <div className='spot_details'>
                <div className='spot_info'>
                  <h3 className='spot_location'>
                    {ele.city}, {ele.state}
                  </h3>
                  <div className='rating_star_container'>
                    <i
                      className='star_img'
                      class='fa-solid fa-star'
                      id='splash_page_star'
                    ></i>
                    <div className='spot_rating' id='star_review_score'>
                      <div className='rating_tern'>
                        {ele?.avgRating === undefined
                          ? 'New!'
                          : `${ele.avgRating} / 5`}
                      </div>
                    </div>
                  </div>
                </div>
                <p className='spot_price'>${ele.price} / night</p>
              </div>
            </div>
          </Link>
        ))}
        <Footer />
      </div>
    </>
  )
}

export default Homepage
