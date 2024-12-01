import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Cart = () => {
  const [carts1, setCarts1] = useState([]);
  const navigate = useNavigate();

  localStorage.removeItem('cartprice');
  localStorage.removeItem('cid');
  localStorage.removeItem('pname');

  useEffect(() => {
    getCarts1();
  }, []);

  let authToken = localStorage.getItem('Authorization');
  let id;
  if (authToken !== null) {
    let a = authToken.split(',');
    id = a[0];
  }

  function getCarts1() {
    axios.get('http://localhost/php/API/?key=cartsp&id=' + id).then(function(response) {
      console.log('getcartres', response.data);
      setCarts1(response.data);
    });
  }

  const handelAdd2 = (i) => {
    axios.post('http://localhost/php/API/?key=cartdelete&id=' + i).then(function(response) {
      window.location.href = '/cart';
    });
  }

  const handeldesinc = (i, q) => {
    axios.post('http://localhost/php/API/?key=cartdesinc&id=' + i + '&q=' + q).then(function(response) {
      window.location.href = '/cart';
    });
  }

  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = Array.isArray(carts1) ? carts1.reduce((price, item) => price + item.qty * item.price, 0) : 0;

  let pp = '';
  let pnm = '';

  const handelAdd = (p, pi, pn) => {
    if (carts1.length === 0) {
      toast.error("You do not have any items in your cart");
      return;
    }
    localStorage.setItem('cartprice', p);
    localStorage.setItem('pname', pn);
    localStorage.setItem('cid', pi);
    toast.success("Proceeding to payment");
    navigate('/paytype');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {carts1.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {carts1 && carts1.map((item) => {
              const productQty = item.price * item.qty;
              pp = pp + item.cid + ',';
              pnm = pnm + item.productName + ',';

              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            Rs. {item.price}.00 * {item.qty}
                            <span>Rs. {productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => handeldesinc(item.cid, item.qty + 1)}
                          >
                            +
                          </button>
                          <button
                            className="desCart"
                            onClick={() => handeldesinc(item.cid, item.qty - 1)}
                          >
                            -
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => handelAdd2(item.cid)}
                    >
                      X
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Cart Summary</h2>
              <div className=" d_flex">
                <h4>Total Price :</h4>
                <h3>Rs. {totalPrice}.00</h3>
              </div>
            </div>
            <input 
              type="button" 
              value="Payment" 
              style={{width:'350px',backgroundColor:"green",color:"white"}} 
              onClick={() => handelAdd(totalPrice, pp, pnm)}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
