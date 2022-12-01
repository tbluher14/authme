import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";

import * as sessionActions from "../../store/session";
import './SignupForm.css'


function SignupForm() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const emailRegX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    useEffect(() => {
      let errors = [];

      if (firstName.length < 2 || firstName.length > 50) {
        errors.push("first name: First Name must be between 2 and 50 characters.")
      }
      if (lastName.length < 2 || lastName.length > 50) {
        errors.push("last name: Last Name must be between 2 and 50 characters.")
      }
      if (username.length < 2 || username.length > 50) {
        errors.push("username: Username must be between 2 and 50 characters.")
      }
      if (!email.match(emailRegX)) {
        errors.push("email: Email must be valid email address (ex@ex.com).")
      }
      if (email.length < 2 || email.length > 50) {
        errors.push("email: Email must be between 2 and 50 characters.")
      }
      if (password.length < 6 || password.length > 50) {
        errors.push('password: Password must be between 6 and 50 characters.');
      }
      if (password !== confirmPassword) {
        errors.push('password: Passwords must match.');
      }

      setErrors(errors);
    }, [firstName, lastName, username, email, password, confirmPassword]);


    const handleSubmit = async (e) => {
      e.preventDefault();

      // if (password === confirmPassword){
        if (errors.length > 0) return
        setErrors([])
        await dispatch(
          sessionActions.signup({
            firstName,
            lastName,
            email,
            username,
            password,
            confirmPassword
          })
        )
          .then(() => {
            dispatch(sessionActions.setShowSignupModal(false));
          })
          .catch(async (res) => {
            const data = await res.json();

            if (data?.errors) setErrors(data.errors);
            if (password!== confirmPassword){
              errors.push(["Confirm password"])
            }
          });
        }
      // }


    return (
        <div className="signup_form_container">
          <h2 className="h2_header">
            Welcome to BestBnB!
            </h2>
          <form className="signup_form" onSubmit={handleSubmit}>
            <ul className="signUp_errors">
               {errors.map((error) => (
                 <li key={error.id}>{error.slice(error.indexOf(':') + 1)}</li>
                 ))}
            </ul>
            <label className="firstName_container">
              <span className="firstName">First Name:</span>
              <input
                type="text"
                className="firstName_input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="lastName_container">
              <span className="lastName">Last Name:</span>
              <input
                type="text"
                value={lastName}
                className="firstName_input"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className="lastName_container">
              <span className="lastName">Email:</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="lastName_container">
              <span className="lastName">Username:</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="lastName_container">
              <span className="lastName">Password:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className="lastName_container">
              <span className="lastName">Confirm Password:</span>
              <input
                className="signup_input_confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <div>
            <button type="submit" className="this_motherfucking_this" >
              Sign Up
            </button>
              </div>
          </form>
        </div>
      );
    }
  export default SignupForm;
