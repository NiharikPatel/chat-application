import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
  
    setData({ ...data, [name]: value });
  
    // Real-time email validation
    if (name === "email") {
      if (!isEmailValid(value)) {
        setError("Invalid email address");
      } else {
        setError(""); // Clear error if email is valid
      }
    }
  
    // Real-time password validation
    if (name === "password") {
      if (!isPasswordValid(value)) {
        setError("Invalid password. Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter.");
      } else {
        setError(""); // Clear error if password is valid
      }
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // You can define your own password requirements using a regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
<div className="row d-flex justify-content-center h-auto">
   
    <div className="justify-content-center text-center my-4  h-50 bg-light rounded"  style={{
          opacity: 0.9, boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", border:"4px solid pink"}}>
                <form className="bg-light p-3" onSubmit={handleSubmit}>
            <h5 className="  font-weight-normal">Create Account</h5>
            <div className="form-group">
              
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="form-control"
              />
            </div>
            {error && <div className="text-danger">{error}</div>}
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </form>
          
          <p>Already registered? <Link  className=" link-info" to="/login"> Sign in
          
          </Link></p>
          </div>
        </div>
      
       
  );
};

export default Signup;
