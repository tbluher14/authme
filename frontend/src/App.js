// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UsersSpots from "./components/Spots/userSpots";
import SpotForm from "./components/Spots/SpotForm";
import SplashPage from "./components/SplashPage";
import EditSpot from "./components/Spots/EditSpot";
import SpotDetails from "./components/Spots/SpotDetails";
import {Modal} from './context/Modal'
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginFormModal/LoginForm";
import SignupForm from "./components/SignupFormPage/SignupForm";
import UsersReviews from "./components/Reviews/UserReviews";
import UserBookings from "./components/Bookings/UserBookings";
import About from "./components/About/about";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const showLoginModal = useSelector((state) => state.session.showLoginModal);
  const showSignupModal = useSelector((state) => state.session.showSignupModal);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route exact path='/reviews/current'>
            <UsersReviews />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path="/currentUser/spots">
            <UsersSpots />
         </Route>
         <Route exact path='/createSpot'>
          <SpotForm/>
         </Route>
         <Route exact path='/bookings/current'>
          <UserBookings/>
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
         <Route exact path='/'>
            <SplashPage />
          </Route>
        </Switch>
      )}
        {showLoginModal && (
        <Modal
          onClose={() => dispatch(sessionActions.setShowLoginModal(false))}
        >
          You must be logged in to host a spot.
          <LoginForm />
        </Modal>
      )}
      {showSignupModal && (
        <Modal
          onClose={() => dispatch(sessionActions.setShowSignupModal(false))}
        >
          <SignupForm/>
        </Modal>
)}
    </>
  );
}

export default App;
