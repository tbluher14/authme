import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createNewSpot } from "../../store/spot";
import * as sessionActions from "../../store/session";
import "./SpotForm.css";

const SpotForm = ({ spot }) => {
  console.log("spot form running")
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [address, setAddress] = useState(spot?.address ?? "");
  const [city, setCity] = useState(spot?.city ?? "");
  const [state, setState] = useState(spot?.state ?? "");
  const [country, setCountry] = useState(spot?.country ?? "");
  const [previewImage, setPreviewImage] = useState("");
  const [lat, setLat] = useState(spot?.lat ?? "");
  const [lng, setLng] = useState(spot?.lng ?? "");
  const [name, setName] = useState(spot?.name ?? "");
  const [description, setDescription] = useState(spot?.description ?? "");
  const [price, setPrice] = useState(spot?.price ?? "");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const showLoginModal = useSelector((state) => state.session.showLoginModal);
  const showSignupModal = useSelector((state) => state.session.showSignupModal);
  console.log("this is errors in usestate of spotform", errors)


  useEffect(() => {
    if (!user && !showLoginModal && !showSignupModal) {
      dispatch(sessionActions.setShowLoginModal(true));
    }

  });


  const handleSubmit = (e) => {
    console.log("handle submit function running")
    e.preventDefault();
    setErrors([]);
    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
      previewImage: previewImage,
    };

    console.log("this is data in handle submit", data)

    return dispatch(createNewSpot(data))

    .then(async (res) => {
      setSubmitSuccess(true);
      setErrors([])

    })
    .catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) {

      setSubmitSuccess(false)

      // const errors = [data.errors]
      console.log('this is errors in the .catch', data.errors)
      setErrors(Object.values(data.errors));
      }
    });
    return data
  };

  if (submitSuccess) {
    return <Redirect to='/' />;
  }

  return (
    <div className="form_input">
      <div className='welcome_header_create_spot'>
      <h2 className='welcome_header_create_spot'>List your home on bestBnB!</h2>
      </div>
      <form className="create_spot" onSubmit={handleSubmit}>
        <h4 className="form_requirements">Please fill out all of the following fields below:</h4>
        <ul className="create_errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}

        </ul>
        <label className="address_container">
        <span className="address_text">Address:</span>
          <input
            className="create_address_input"
            type="text"
            value={address}

            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">City:</span>
          <input
            className="address_input"
            type="text"
            value={city}

            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">State:</span>
          <input
            type="text"
            value={state}
            className="address_input"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">Country:</span>
          <input
            type="text"
            value={country}
            className="address_input"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">Latitude:</span>
          <input
            type="text"
            value={lat}
            className="address_input"
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">Longitude:</span>
          <input
            type="text"
            value={lng}
            className="address_input"
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text"> Name: </span>
          <input
            type="text"
            value={name}
            className="address_input"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">Description:</span>
          <input
            type="text"
            value={description}
            className="address_input"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">Price per night:</span>
          <input
            type="text"
            value={price}
            className="address_input"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className="address_container">
        <span className="address_text">Image Url:</span>
          <input
            type="text"
            value={previewImage}
            placeholder="img-url"
            onChange={(e) => setPreviewImage((e.target.value))}
            required
          />
        </label>
        <button type="submit" className="create_spot_button">Submit Spot</button>
      </form>
    </div>
  );
};

export default SpotForm;
