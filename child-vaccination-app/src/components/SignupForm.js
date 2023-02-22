import React, { useState } from "react";
import NavbarHome from "../layout/NavbarHome";
import { Navigate, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "../styles/Signup.css";

function SignupForm() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    mobileNo: "",
  });
  const [errors, setErrors] = useState({});
  const cities = ["Bangalore", "Chennai", "Delhi", "Mumbai", "Pune"];
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = UserService.signup(user);
        console.log(response.data);
        alert("Registered Successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isUnique(str) {
    return new Set(str).size === str.length;
  }

  const validateInputs = () => {
    const errors = {};
    if (!user.userName.trim()) {
      errors.userName = "Username is required";
    }
    if (!isUnique(user.userName)) {
      errors.userName = "Username Should be Unique";
    }
    if (!user.password.trim()) {
      errors.password = "Password is required";
    }
    if (user.password.length < 6) {
      errors.logiPassword = "Password must contain min 6 characters";
    }
    if (!user.email.trim()) {
      errors.email = "Email is required";
    }
    if (!isValidEmail(user.email)) {
      errors.email = "Invalid Email";
    }
    if (!user.address) {
      errors.address = "City is required";
    }
    if (!user.mobileNo.trim()) {
      errors.mobileNo = "Mobile Number is required";
    }
    if (!user.mobileNo.match("[0-9]{10}")) {
      errors.mobileNo = "Mobile number should be 10 digits";
    }
    return errors;
  };

  return (
    <>
      <NavbarHome />
      <div style={{ backgroundColor: '#f6fded'}}>
        <div className="signup-card">
          <h2>Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={user.userName}
                onChange={handleInputChange}
              />
              {errors.userName && (
                <div className="error">{errors.userName}</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <select
                id="city"
                name="address"
                value={user.address}
                onChange={handleInputChange}
              >
                <option value="">-- Select a city --</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
            <div>
              <label htmlFor="mobileNo">Mobile Number:</label>
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                value={user.mobileNo}
                onChange={handleInputChange}
              />
              {errors.mobileNo && (
                <div className="error">{errors.mobileNo}</div>
              )}
            </div>
            <button type="submit">Signup</button>
          </form>
          <br></br>
          <p id="log">Already have an account  <a href="/login">Login</a></p>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
