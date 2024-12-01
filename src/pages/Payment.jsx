import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Cart = () => {
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [expiryError, setExpiryError] = useState(null);

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
	localStorage.removeItem('pmode');
    if (/^\d*$/.test(value) || value === "") {
      setCardNumber(value);
      const visaRegex = /^4/;
      const mastercardRegex = /^5[1-5]/;
      const rupayRegex = /^(508[5-9]|60698[5-9]|60699|607[0-8][0-9]|6079[0-8]|608[0-4][0-9]|60850|6521[5-9]|652[2-9][0-9]|6530[0-9]|6531[0-4])/;
      if (visaRegex.test(value)) {
        setCardType('Visa');
      } else if (mastercardRegex.test(value)) {
        setCardType('Mastercard');
      } else if (rupayRegex.test(value)) {
        setCardType('RuPay');
      } else {
        setCardType('');
      }
    }
  };

  const handleNameOnCardChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
      setNameOnCard(value);
    }
  };

  const handleMobilephonenumberOnChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
      setNameOnCard(value);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
      setCity(value);
    }
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === "") {
      setZipCode(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9/]/g, '');
    if (value.length === 2 && expiryDate.length === 1) {
      value += '/';
    }
    setExpiryDate(value);
  };

  const validateExpiryDate = (date) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return false;
    }

    const [month, year] = date.split('/').map(Number);
    if (month < 1 || month > 12) {
      return false;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  };

  const handleCVVChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    setCVV(value);
  };

  const tp = localStorage.getItem('cartprice');
  const ci = localStorage.getItem('cid');
 localStorage.setItem('pmode','Online Payment');
  const handlePayment = (e) => {
    e.preventDefault();

    if (!validateExpiryDate(expiryDate)) {
      setExpiryError("Invalid expiry date. Please enter a valid date in MM/YY format.");
      return;
    }

    const num = cardNumber;
    const date = expiryDate;
    const cv = cvv;
    const nam = nameOnCard;
    const add = address;
    const cit = city;
    const zip = zipCode;

    axios.post(`http://localhost/php/API/?key=payment&num=${num}&date=${date}&cv=${cv}&nam=${nam}&add=${add}&cit=${cit}&zip=${zip}&pri=${tp}&ci=${ci}`, inputs)
      .then(function(response){
        console.log(response.data);
        toast.success("Payment Successful");
        window.location.href = '/payslip';
      });   
  };

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <section className="cart-items1">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>Payment Details: Rs.{tp}</h2>
            <Form onSubmit={handlePayment}>
              <Form.Group controlId="card_number">
                <Form.Label>Card Number:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your card number" 
                  id="num"
                  value={cardNumber}
                  maxLength="16"
                  onChange={handleCardNumberChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="expiry_date">
                <Form.Label>Expiry Date:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="MM/YY" 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  id="date"
                  required
                />
                {expiryError && <p style={{ color: 'red' }}>{expiryError}</p>}
              </Form.Group>
              <Form.Group controlId="cvv">
                <Form.Label>CVV:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter CVV" 
                  value={cvv}
                  maxLength="3"
                  onChange={handleCVVChange}
                  id="cv"
                  required
                />
              </Form.Group>
              <Form.Group controlId="name_on_card">
                <Form.Label>Name on Card:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  value={nameOnCard}
                  onChange={handleNameOnCardChange}
                  id="nam"
                  required
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="add"
                  required
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your city" 
                  value={city}
                  onChange={handleCityChange}
                  id="cit"
                  required
                />
              </Form.Group>
              <Form.Group controlId="zip_code">
                <Form.Label>ZIP Code:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your ZIP code" 
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  id="zip"
                  required
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Submit Payment
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
