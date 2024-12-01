// src/ProductTracker.js
import React from 'react';
import './track.css';

const ProductTracker = () => {
  const orderDetails = {
    orderId: 'Y34XDHR',
    expectedArrival: '01/12/19',
    carrier: 'USPS',
    trackingNumber: '234094567242423422898',
    steps: [
      { icon: 'https://i.imgur.com/9nnc9Et.png', label: 'Order Processed', isActive: true },
      { icon: 'https://i.imgur.com/u1AzR7w.png', label: 'Order Shipped', isActive: true },
      { icon: 'https://i.imgur.com/TkPm63y.png', label: 'Order En Route', isActive: true },
      { icon: 'https://i.imgur.com/HdsziHP.png', label: 'Order Arrived', isActive: false },
    ],
  };

  return (
    <div className="container px-1 px-md-4 py-5 mx-auto">
      <div className="card">
        <div className="row d-flex justify-content-between px-3 top">
          <div className="d-flex">
            <h5>ORDER <span className="text-primary font-weight-bold">#{orderDetails.orderId}</span></h5>
          </div>
          <div className="d-flex flex-column text-sm-right">
            <p className="mb-0">Expected Arrival <span>{orderDetails.expectedArrival}</span></p>
            <p>{orderDetails.carrier} <span className="font-weight-bold">{orderDetails.trackingNumber}</span></p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <ul id="progressbar" className="text-center">
              {orderDetails.steps.map((step, index) => (
                <li key={index} className={`step0 ${step.isActive ? 'active' : ''}`}></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row justify-content-between top">
          {orderDetails.steps.map((step, index) => (
            <div key={index} className="row d-flex icon-content">
              <img className="icon" src={step.icon} alt={step.label} />
              <div className="d-flex flex-column">
                <p className="font-weight-bold">{step.label.split(' ').map((text, idx) => (
                  <React.Fragment key={idx}>{text}<br/></React.Fragment>
                ))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTracker;
