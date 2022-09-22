import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { clearState, thunkUpdateImage } from "../../store/spot";
import { editASpot, findSpotById, listAllSpots } from "../../store/spot";
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
  // const updatePreviewImage = (e) => setSelectedSpot({...selectedSpot, previewImage:e.target.value});
  const [savedSpotId, setSavedSpotId] = useState(spotId)
  const [previewImage, setPreviewImage] = useState('')

useEffect(() => {
  // if (!spotId) history.push('/')

  async function fetchData() {
    const response = await dispatch(findSpotById(spotId));
    setSelectedSpot(response)
  }
  fetchData();

}, [dispatch, history, spotId])

console.log("selected spot", selectedSpot)

// --------------------------------------------------------------------------------------------------
// HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if preview image IS NOT changing
    if (previewImage.length < 1) {
      e.preventDefault()
      return dispatch(editASpot(selectedSpot, spotId))
      .then(() => {
        setSubmitSuccess(true)
        dispatch(listAllSpots())
      })
      .catch(async (res) => {
          const data = await res.json();
          if (data.errors) {setErrors(Object.values(data.errors))}
      })
    }

    // if preview image changes:
    if (previewImage.length > 1){
      await dispatch(thunkUpdateImage(selectedSpot.id, selectedSpot.id, previewImage))
      e.preventDefault()
      // to do: clear state
      // await dispatch(clearState())
      return dispatch(editASpot(selectedSpot, spotId))

      .then(() => {
      setSubmitSuccess(true)
      dispatch(listAllSpots())
    })
    .catch(async (res) => {
        const data = await res.json();
        if (data.errors) {setErrors(Object.values(data.errors))}
    })
  }
}

// --------------------------------------------------------------------------------------------------
const submitHelper = async (spotId) =>{
  // await dispatch(clearState())
  history.push(`/spots/${spotId}`)
}

if (submitSuccess) {
  // try down here too on clear state
  // await dispatch(clearState())
  // history.push(`/spots/${spotId}`)
  submitHelper(spotId)
}

// JSX
// --------------------------------------------------------------------------------------------------
  return (

    <form className="create_spot" onSubmit={handleSubmit}>
      <h2 className="edit_header">Edit My Spot</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
          ))}
      </ul>
        <div className="edit_spot_container">
        <label className="spot_name">
          Spot Name:
        <input
          type="text"
          placeholder="Spot Name"
          className="name_input"
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
          className="address_input"
          value={selectedSpot.address}
          onChange={updateAddress}
          required
        />
      </label>
      <label className="spot_city">
        City:
        <input
          type="text"
          className="city_input"
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
          className="state_input"
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
          className="country_input"
          value={selectedSpot.country}
          onChange={updateCountry}
          required
        />
      </label>
      <label className="spot_lat">
        Latitude:
        <input
          type="text"
          className="lat_input"
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
          className="lng_input"
          placeholder="Longitude"
          value={selectedSpot.lng}
          onChange={updateLng}
          required
        />
      </label>
      <label className="spot_description_edit">
        Spot Description:
        <input
          type="textarea"
          rows="10"
          cols='30'
          className="description_input"

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
          className="price_input"
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
            className="img_input"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}

          />
      </label>
      <button type="submit" className="submit_edits">Confirm Changes</button>
      </div>
    </form>
  );
};

export default EditSpot;
