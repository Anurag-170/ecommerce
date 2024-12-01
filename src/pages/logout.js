import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Login.css'; // External CSS file

const Logout = () => {
	localStorage.removeItem('Authorization');
  localStorage.clear(); // Clears all data stored in local storage
  sessionStorage.clear(); // Clears all data stored in session storage
  const navigate = useNavigate();
 //  navigate('/login');
   window.location.href = '/login';
};

export default Logout;
