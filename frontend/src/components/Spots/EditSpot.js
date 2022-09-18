import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editASpot, findSpotById } from "../../store/spot";
import './EditSpot.css'

const EditSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState({})
  const updateName = (e) => setSelectedSpot({...selectedSpot, name:e.target.value});
  const updateAddress = (e) => setSelectedSpot({...selectedSpot, address:e.target.value});
  const updateCity = (e) => setSelectedSpot({...selectedSpot, city:e.target.value});
  const updateState = (e) => setSelectedSpot({...selectedSpot, state:e.target.value});
  const updateCountry = (e) => setSelectedSpot({...selectedSpot, country:e.target.value});
  const updatePrice = (e) => setSelectedSpot({...selectedSpot, price:e.target.value});
  const updateLat = (e) => setSelectedSpot({...selectedSpot, lat:e.target.value});
  const updateLng = (e) => setSelectedSpot({...selectedSpot, lng:e.target.value});
  const updateDescription = (e) => setSelectedSpot({...selectedSpot, description:e.target.value});
  const updatePreviewImage = (e) => setSelectedSpot({...selectedSpot, previewImage:e.target.value});


useEffect(() => {
  if (!spotId) history.push('/')

  async function fetchData() {
    const response = await dispatch(findSpotById(spotId));
    setSelectedSpot(response)
  }
  fetchData();

}, [dispatch, history, spotId])


  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(editASpot(selectedSpot, spotId))
      .then(async (res) => {
        // console.log("Success");
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
          const data = await res.json();
          // console.log("data in submit", data.errors)
          if (data.errors) {setErrors(Object.values(data.errors))}
          // console.log(data.errors)
          // if (data?.message) setErrors([data.message]);
          // return errors
      })
    }


  if (submitSuccess) {
    history.push(`/spots/${spotId}`)
  }

  return (

    <form className="create_spot" onSubmit={handleSubmit}>
      <h2 className="edit_header">Edit My Spot</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
          ))}
      </ul>
        <div>
        <label className="spot_name">
          Spot Name:
        <input
          type="text"
          placeholder="Spot Name"
          value={selectedSpot.name}
          onChange={updateName}
          required
          />
      </label>

      <label className="spot_address">
        Address:
        <input
          type="text"
          placeholder="Address"
          value={selectedSpot.address}
          onChange={updateAddress}
          required
        />
      </label>
      <label className="spot_city">
        City:
        <input
          type="text"
          placeholder="City"
          value={selectedSpot.city}
          onChange={updateCity}
          required
        />
      </label>
      <label className="spot_state">
        State:
        <input
          type="text"
          placeholder="State"
          value={selectedSpot.state}
          onChange={updateState}
          required
        />
      </label>
      <label className="spot_country">
        Country:
        <input
          type="text"
          placeholder="Country"
          value={selectedSpot.country}
          onChange={updateCountry}
          required
        />
      </label>
      <label className="spot_lat">
        Latitude:
        <input
          type="text"
          placeholder="Latitude"
          value={selectedSpot.lat}
          onChange={updateLat}
          required
        />
      </label>
      <label className="spot_long">
        Longitude:
        <input
          type="text"
          placeholder="Longitude"
          value={selectedSpot.lng}
          onChange={updateLng}
          required
        />
      </label>
      <label className="spot_description">
        Spot Description:
        <input
          type="textarea"
          name="textvalue"
          placeholder="Description"
          value={selectedSpot.description}
          onChange={updateDescription}
          required
        />
      </label>
      <label className="spot_price">
        Price Per Night:
        <input
          type="text"
          placeholder="Price"
          value={selectedSpot.price}
          onChange={updatePrice}
          required
        />
          </label>
        <label className="url">
          Image Url:
          <input
            type="text"
            placeholder="img-url"
            value={selectedSpot.previewImage}
            onChange={updatePreviewImage}
            
          />
      </label>
      <button type="submit">Confirm Changes</button>
      </div>
    </form>
  );
};

export default EditSpot;
