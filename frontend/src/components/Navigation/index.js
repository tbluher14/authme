import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { Dispatch } from 'react';
import './Navigation.css';
import DemoUser from '../DemoUser';
import * as sessionActions from '../../store/session'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className='logged_out_login'>
        <LoginFormModal />
      </div>
      <button className='logged_out_signup'

        onClick={() => dispatch(sessionActions.setShowSignupModal(true))}
        >Sign Up!
      </button>
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
        <div className="demo_user">
          <DemoUser />
        </div>
        <div>
          <div className='become_host'>
          <NavLink to="/createSpot">
            Become a Host
          </NavLink>
          </div>
        </div>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </>
  );
}

export default Navigation;
