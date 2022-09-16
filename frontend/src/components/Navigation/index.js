// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';
import DemoUser from '../DemoUser';

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
            className="home_link"
            id="bestbnb_logo"
          >
          
            <span className="bestbnb_logo">bestBnB</span>

          </NavLink>
        </div>
        <span className="demo_user">
            <DemoUser />
          </span>
        <div>
          <NavLink to="/createSpot" className="become_a_host">
              Become a Host
          </NavLink>

        </div>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </>
  );
}

export default Navigation;
