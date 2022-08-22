import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import  getCurrentUsersSpots  from "../../store/spot";

const UsersSpots = () => {
  const dispatch = useDispatch();
  const userSpotsObj = useSelector(state => state.spots);
  console.log("user spotsObj, useSelector", userSpotsObj)
  const userSpots = Object.values(userSpotsObj); //changing to array to .map


  useEffect(() => {
    console.log("here is the useEffect in userSpots")
    dispatch(getCurrentUsersSpots());

  }, [dispatch]);

  if (userSpots.length === 0) {
    return <p>Oh no! No properties yet.</p>;
  }

  return (null)
}

export default UsersSpots
