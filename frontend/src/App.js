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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/currentUser/spots">
            <UsersSpots />
         </Route>
         <Route exact path='/createSpot'>
          <SpotForm/>
         </Route>
         <Route exact path='/'>
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
