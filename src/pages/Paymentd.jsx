import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify'
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

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
	
	localStorage.removeItem('pmode');
    // Only allow numeric characters for card number
    if (/^\d*$/.test(value) || value === "") {
      setCardNumber(value);
      // Detect card type based on the entered card number
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
    // Only allow alphabetic characters for name on card
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
      setNameOnCard(value);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    // Only allow alphabetic characters for city
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
      setCity(value);
    }
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    // Only allow numeric characters for ZIP code
    if (/^\d*$/.test(value) || value === "") {
      setZipCode(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value;
    // Remove any non-numeric characters except "/"
    value = value.replace(/[^0-9/]/g, '');
    setExpiryDate(value);
  };

  const handleCVVChange = (e) => {
    let value = e.target.value;
    // Remove any non-numeric characters
    value = value.replace(/\D/g, '');
    setCVV(value);
  };
 let tp = localStorage.getItem('cartprice');
 let ci = localStorage.getItem('cid');
  localStorage.setItem('pmode','Cash on Delivery');
  const handlePayment = (e) => {
    e.preventDefault();
	
	let add=document.getElementById('add').value;
	let cit=document.getElementById('cit').value;
	let zip=document.getElementById('zip').value;
	//alert('http://localhost/php/API/?key=payment&num='+num+'&date='+date+'&cv='+cv+'&nam='+nam+'&add='+add+'&cit='+cit+'&zip='+zip+'&pri='+tp+'&ci'+ci);
         //   alert('http://localhost/php/API/?key=payment&num='+num+'&date='+date+'&cv='+cv+'&nam='+nam+'&add='+add+'&cit='+cit+'&zip='+zip+'&pri'+tp);
       axios.post('http://localhost/php/API/?key=paymentd&add='+add+'&cit='+cit+'&zip='+zip+'&pri='+tp+'&ci='+ci, inputs).then(function(response){
            console.log(response.data);
          
            toast.success("Payment Successfull");
            //navigate('/payslip');
            window.location.href = '/payslip';
            
        });   
        
  };

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);
  
  return (
    <section className="cart-items1">
      <Container>
        <Row className="justify-content-center">
          {/* Your existing cart items display */}
          {/* Add payment form */}
          <Col md={6}>
            <h2>Payment Details: Rs.{tp}</h2>
           
            <Form onSubmit={handlePayment}>
             
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
              <br></br>
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

