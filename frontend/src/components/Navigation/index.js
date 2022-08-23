// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
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
            className="nav_link home_link"
            id="bestbnb_logo"
          >
            <span
              className="iconify"
              data-icon="fa-brands:airbnb"
              data-width="40"
            ></span>
            <span className="bestbnb_logo">bestbnb</span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/spots" className="become_a_host">
              Become a Host
          </NavLink>
        </div>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </>
  );
}

export default Navigation;
