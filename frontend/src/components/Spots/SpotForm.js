import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createNewSpot } from "../../store/spot";
import * as sessionActions from "../../store/session";
import "./SpotForm.css";

const SpotForm = ({ spot }) => {
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

  useEffect(() => {
    if (!user && !showLoginModal && !showSignupModal) {
      dispatch(sessionActions.setShowLoginModal(true));
    }

  });





  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
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


    return dispatch(createNewSpot(data))
    .then(async (res) => {
      setSubmitSuccess(true);
      setErrors([])
    })
    .catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) {
      setSubmitSuccess(false)
      // console.log('data', data)
      const errors = [data.title, data.errors]
      setErrors(Object.values(errors));

      }
    });
  };

  if (submitSuccess) {
    return <Redirect to='/' />;
  }

  return (
    <div className="form_input">
      <form className="create_spot" onSubmit={handleSubmit}>
        <h4 className="form_requirements">Please fill out all of the following fields below:</h4>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}

        </ul>
        <label>
        <span>Address:</span>
          <input
            type="text"
            value={address}

            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
        <span>City:</span>
          <input
            type="text"
            value={city}

            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
        <span>State:</span>
          <input
            type="text"
            value={state}

            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Country:</span>
          <input
            type="text"
            value={country}

            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Latitude:</span>
          <input
            type="text"
            value={lat}

            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Longitude:</span>
          <input
            type="text"
            value={lng}

            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
        <span> Name: </span>
          <input
            type="text"
            value={name}

            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Description:</span>
          <input
            type="text"
            value={description}

            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Price per night:</span>
          <input
            type="text"
            value={price}

            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Image Url:</span>
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
