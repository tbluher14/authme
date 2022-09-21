import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import { useHistory } from "react-router-dom";


function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    // const history = useHistory()

    if (sessionUser) return <Redirect to="/" />;


    const handleSubmit = async (e) => {
      e.preventDefault();
      // if (password === confirmPassword){
        await dispatch(
          sessionActions.signup({
            firstName,
            lastName,
            email,
            username,
            password,
          })
        )
          .then(() => {
            dispatch(sessionActions.setShowSignupModal(false));
          })
          .catch(async (res) => {
            const data = await res.json();
            // console.log("data",data)
            if (data?.message) setErrors([data.errors]);
          });
      }
    // }

    return (
        <div className="signup_form_container">
          <h2 className="h2_header">
            Welcome to BestBnB!
            </h2>
          <form className="signup_form" onSubmit={handleSubmit}>
            <ul className="errors">
               {errors.map((error, idx) => (
                 <li key={idx}>{error}</li>
                 ))}
            </ul>
            <label>
              <span>First Name:</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Last Name:</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Email:</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Username:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Password:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Confirm Password:</span>
              <input
                className="signup_input_confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button className="signup_button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      );
    }
  export default SignupForm;
