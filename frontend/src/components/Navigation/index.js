import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { Dispatch } from 'react';
import './Navigation.css';
import DemoUser from '../DemoUser';
import logo from './staticAssets/logo.jpeg'
import * as sessionActions from '../../store/session'
import { searchSpotThunk } from '../../store/queriedSpot';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const history = useHistory()
  const [search, setSearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchSpotThunk(search))

    const url = `/search?name=${search}`
    setSearch("")
    history.push(url)
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div className="loggedInStuff">
      <ProfileButton user={sessionUser} />
      </div>
      </>
    );

  } else {
    sessionLinks = (
      <>
  <div className="loggedOutStuff">
  <LoginFormModal className="logged_out_login"/>
  <button className='logged_out_signup'
  onClick={() => dispatch(sessionActions.setShowSignupModal(true))}
  >Sign Up
  </button>
  <DemoUser />
  </div>
      </>
    );
  }

  return (
    <>
      <div className="navigation_bar">
        <div>
          <NavLink
            exact
            to="/"
            className="home_link"
            id="bestbnb_logo"
          >
            <img
            src={logo}
            alt="logo"
            className='logo'
            />
            <span className="bestbnb_logo">bestBnB</span>
          </NavLink>
        <div className='navbar-search-container'>
        <input
          className='navbar-search-box'
          type="text"
          placeholder="Search Event Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {if (e.key === "Enter") {handleSearch(e)}}}>
        </input>
        <button onClick={handleSearch} className='navbar-search-button'>
          <i className="fa-solid fa-magnifying-glass" id="mag-glass"></i>
        </button>

      </div>
        </div>
        {sessionUser &&
        // <div className='become_host'>
         <NavLink to="/createSpot"
         className="become_host">
          Become a Host
        </NavLink>
          // </div>
        }

        <div>{isLoaded && sessionLinks}</div>
      </div>
    </>
  );
}

export default Navigation;
