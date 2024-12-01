import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
//import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import wishlist from "../../Images/wishlist.png";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    } else {
      toast.error("Quantity cannot be less than one.");
    }
  };

  let authToken = localStorage.getItem("Authorization");
  let id = 0;
  if (authToken !== null) {
    let a = authToken.split(",");
    id = a[0];
  }

  //const handleAddToCart = (selectedProduct, quantity) => {
  //  dispatch(addToCart({ product: selectedProduct, num: quantity }));
  //  toast.success("Product has been added to cart!");
  //};

  const handleAddToWishlist = (c, p) => {
    let fo=document.getElementById('fo').value;
    axios
      .post(`http://localhost/php/API/?key=wishlist&c=${c}&p=${p}&fo=${fo}`)
      .then((response) => {
        console.log(response.data);
        toast.success("Product has been added to wishlist!");
        window.location.href = '/wishlist';
      });
  };
const dis="none";
  const handleAddToCartWithApi = (c, p, q, pr) => {
   let fo=document.getElementById('fo').value;
   console.log('fo',fo);
    axios
      .post(
        `http://localhost/php/API/?key=cartlist&c=${c}&p=${p}&q=${q}&pri=${pr}&fo=${fo}`
      )
      .then((response) => {
        console.log(response.data,'response on add');
       
        toast.success("Product has been added to cart!");
        window.location.href = '/cart';

      });
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img
              loading="lazy"
              src={selectedProduct?.imgUrl}
              alt={selectedProduct?.productName}
            />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <div className="rate">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa fa-star"></i>
                ))}
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div>
            <div className="info">
              <span className="price">Rs. {selectedProduct?.price}</span>
              <span>Category: {selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.shortDesc}</p>
            <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              min="1"
              
              onChange={handleQuantityChange}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select id="fo">
            <option>Red</option>
            <option>Blue</option>
            <option>White</option>
            <option>Brown</option>
            <option>Gold</option>
            <option>Silver</option>
           

            </select>
            
            <button
              aria-label="Add to Cart"
              type="button"
              className="add"
              style={{display:selectedProduct?.quantity<=0 ? "none" : "block"}}
              onClick={() =>
                handleAddToCartWithApi(
                  id,
                  selectedProduct?.id,
                  quantity,
                  selectedProduct?.price
                )
              }
            >
              Add To Cart
            </button>
            <br />
            <button
              aria-label="Add to Wishlist"
              type="button"
              className="add"
              style={{display:selectedProduct?.quantity<=0 ? "none" : "block"}}
              onClick={() => handleAddToWishlist(id, selectedProduct?.id)}
            >
              Add To Wishlist
            </button>
            <br/>
            <span style={{color:'red',fontWeight:'bold'}}>{selectedProduct?.quantity<=0 ? "Out of Stock" : ""}</span>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
