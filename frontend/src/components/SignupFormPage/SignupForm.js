import React, { useState } from "react";
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
    console.log("this is errors" ,errors)
    // const history = useHistory()

  console.log("errors in sign up", errors)

    const handleSubmit = async (e) => {
      e.preventDefault();

      // if (password === confirmPassword){
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
            console.log(data)
            if (data?.errors) setErrors(data.errors);
            if (password!== confirmPassword){
              errors.push(["Confirm password"])
            }
            // const dataString = data.errors
            // if (dataString) {
            //   setErrors([dataString])
            //   return errors
            // }
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
               {errors.map((error, idx) => (
                 <li key={idx}>{error}</li>
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
