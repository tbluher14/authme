// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import {Redirect, Link} from 'react-router-dom'
import './ProfileButton.css'
import {useHistory} from 'react-router-dom'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const showUsersSpots = (e) => {history.push('/currentUser/spots')};
  const showUsersReviews = (e) => {
    e. preventDefault()
    history.push('/reviews/current')};
  const showUsersBookings = (e) => {
    e. preventDefault()
    history.push('/bookings/current')
    };


  return (
    <>
    <div>
      <button className="loggedIn_menu" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle user_icon"></i>
      </button>
      <div className="menu_modal">
      {showMenu && (
        <div className="menu_container">
        <div className="menu">
          <button onClick={showUsersReviews} className="userReviews_button">My Reviews</button>
          <button onClick={showUsersSpots} className="userSpots_button">My Spots</button>
          <button onClick={showUsersBookings} className="userBookings_button">My Bookings</button>
          <button onClick={() => history.push('/about')} className="userBookings_button">About</button>
          {/* <NavLink to="/currentUser/spots" className="my_spots">
            My Spots
          </NavLink>
          <NavLink to="/reviews/current" className="my_reviews">
          My Reviews</NavLink> */}
          <button onClick={logout} className="logOut_button">
            Log Out
          </button>
          </div>
        </div>
      )}
      </div>
    </div>
  </>
  );
}

export default ProfileButton;
