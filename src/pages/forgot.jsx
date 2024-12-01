import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { toast } from 'react-toastify'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './Login.css'; // External CSS file

const Forgot = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
	  const handleSubmit = (event) => {
        event.preventDefault();
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const yahooRegex = /^[a-zA-Z0-9._%+-]+@yahoo\.com$/;
        const hotmailRegex = /^[a-zA-Z0-9._%+-]+@hotmail\.com$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     
        try {
         
          if (!credentials.email && !credentials.password) {
            toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
          }
          else if (!emailRegex.test(credentials.email)) {
            toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' })
          }
          else if (passwordRegex.test(credentials.password)===false) {
            toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
          }
          else if (gmailRegex.test(credentials.email)===false && yahooRegex.test(credentials.email)===false && hotmailRegex.test(credentials.email)===false) {
            toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.password.length < 8) {
            toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.email && credentials.password) {
            axios.post('http://localhost/php/API/?key=forgot', inputs).then(function(response){
 if (response.data!='') { 
        
			 console.log(response.data);
             
       toast.success("Forgot Successfully");
	
	
	setInputs(true);
              
            navigate('/login');
 }
 else
 {
  toast.success("Invalid Password");
  
 }
 window.location.reload();
                    });
    
          }
        }
        catch (error) {
          error.response.data.error.length === 1 ?
            toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
            : toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }
    
        
    }
 
  return (
<div>


<div className="login-container">
      <div className="login-content">
       
        <div className="login-form-container">
          <center><h1>Forgot Password</h1></center>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name='email'
              onChange={handleChange} 
              
            />
            <label>Password</label>
            <input
              type="password"
              name='password'
              onChange={handleChange}
              
            />
            <button type="submit" className="signin-button">Forgot Password</button>
          </form>
          <p>By continuing, you agree to terms  Conditions of Use and Privacy Notice.</p>
          <hr />
          <center>
            <Link to="/login">Login</Link>
            </center>
         
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Forgot;
