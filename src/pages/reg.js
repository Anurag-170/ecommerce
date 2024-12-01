import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify'

import { useNavigate } from "react-router-dom";

import './reg.css'; // External CSS file

export default function Reg() {

  const [credentials, setCredentials] = useState({ name: "", email: "", mobile: '', password: "" })
  
  const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);
    const [nameOnCard, setNameOnCard] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
          
        setInputs(values => ({...values, [name]: value}));

        setCredentials({ ...credentials, [event.target.name]: event.target.value })
        
    }
const abc = (e) =>{

  
  const a=String.fromCharCode(e.which);
  if (!/^[a-zA-Z\s]*$/.test(a)) {
    e.preventDefault();
      }
}
const abc1 = (e) =>{

   
  const a=String.fromCharCode(e.which);
  if (/^[a-zA-Z\s]*$/.test(a)) {
    e.preventDefault();
      }
      if (/^[a-zA-Z0-5!@#$%^&*()><?/]*$/.test(a) && credentials.mobile.length==0) {
        e.preventDefault();
          }
         
          
}
  
  
    const handleSubmit = (event) => {
        event.preventDefault();
        let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const yahooRegex = /^[a-zA-Z0-9._%+-]+@yahoo\.com$/;
        const hotmailRegex = /^[a-zA-Z0-9._%+-]+@hotmail\.com$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     
        try {
          if (!credentials.email && !credentials.name && !credentials.password && !credentials.mobile) {
            toast.error("All fields are required", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.name.length < 1) {
            toast.error("Please enter valid name", { autoClose: 500, theme: 'colored' })
          }
          else if (emailRegex.test(credentials.email)===false) {
            toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
          }
          else if (passwordRegex.test(credentials.password)===false) {
            toast.error("Please enter valid password", { autoClose: 500, theme: 'colored' })
          }
          else if (gmailRegex.test(credentials.email)===false && yahooRegex.test(credentials.email)===false && hotmailRegex.test(credentials.email)===false) {
            toast.error("Please enter valid email", { autoClose: 500, theme: 'colored' })
          }
          else if (phoneRegex.test(credentials.mobile)===false) {
            toast.error("Please enter a valid phone number", { autoClose: 500, theme: 'colored' })
            console.log(1);
          }
          else if (credentials.password.length < 8) {
            toast.error("Please enter password with more than 5 characters", { autoClose: 500, theme: 'colored' })
          }
          else if (credentials.email && credentials.name && credentials.mobile && credentials.password) {
                    axios.post('http://localhost/php/API/?key=POST', inputs).then(function(response){
            console.log(response.data);
           
            toast.success("Registration Successfully");
            navigate('/');
            
        });
        

          }
        } catch (error) {
          toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
    
        }
    
    }
 
  return (
<div>
<div className="login-container">
    
      <div className="login-content">
        <div className="login-form-container">
          <center><h1>Create Account</h1></center>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              
              name="name"
              onChange={handleChange} 
              onKeyPress={abc}
            />
            <label>Email</label>
            <input
              type="text"
              name='email'
              onChange={handleChange} 
              
            />
            <label>Mobile Number</label>
            <input
              type="text"
              name='mobile'
              maxlength="10"
              onChange={handleChange} 
              onKeyPress={abc1}
            />
            <label>Password</label>
            <input
              type="password"
              name='password'
              maxlength="12"
              onChange={handleChange} 
              
            />
           
            
            <button type="submit" className="signin-button">Sign-In</button>
          </form>
          <hr/>
          <p>By continuing, you agree to terms and  Conditions of Use and Privacy Notice.</p>
          <hr />
        </div>
      </div>
    </div>
</div>
  );
};
