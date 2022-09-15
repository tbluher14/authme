import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editASpot, editSpot, findSpotById } from "../../store/spot";

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
    console.log("response from fetch findSpotById", response)
    setSelectedSpot(response)
  }
  fetchData();

}, [dispatch, history, spotId])


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(editASpot(selectedSpot, spotId))
      .then(async (res) => {
        console.log("Success");
        setSubmitSuccess(true);

      })
  };

  if (submitSuccess) {
    history.push(`/spots/${spotId}`)
  }

  return (
    <form className="create_spot" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <input
          type="text"
          placeholder="Spot Name"
          value={selectedSpot.name}
          onChange={updateName}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Address"
          value={selectedSpot.address}
          onChange={updateAddress}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="City"
          value={selectedSpot.city}
          onChange={updateCity}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="State"
          value={selectedSpot.state}
          onChange={updateState}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Country"
          value={selectedSpot.country}
          onChange={updateCountry}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Latitude"
          value={selectedSpot.lat}
          onChange={updateLat}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Longitude"
          value={selectedSpot.lng}
          onChange={updateLng}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Description"
          value={selectedSpot.description}
          onChange={updateDescription}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Price"
          value={selectedSpot.price}
          onChange={updatePrice}
        />
        <label>
          <input
            type="text"
            placeholder="img-url"
            value={selectedSpot.previewImage}
            onChange={updatePreviewImage}
          />
        </label>
      </label>
      <button type="submit">Confirm Changes</button>
    </form>
  );
};

export default EditSpot;
