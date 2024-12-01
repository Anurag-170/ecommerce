// src/ContactUs.js

import React from 'react';

const ContactUs = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Us</h2>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p>Email: Multimart@company.com</p>
        <p>Phone: +91 9911850851</p>
        <p>Address: Multimart Pvt Ltd,Gaziyabad, Uttar Pradesh, 2220001</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="https://www.facebook.com/company" className="social-icon" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#555', fontSize: '24px', textDecoration: 'none' }}>
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/company" className="social-icon" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#555', fontSize: '24px', textDecoration: 'none' }}>
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.twitter.com/company" className="social-icon" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#555', fontSize: '24px', textDecoration: 'none' }}>
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
