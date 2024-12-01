import { useEffect,useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Outlet, Link } from "react-router-dom";

import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Wishlist = () => {
	const [wishs1, setWishs1] = useState([]);
 
  useEffect(() => {
    getWishs1();
}, []);
  let authToken = localStorage.getItem('Authorization');
  
  let id;
if(authToken!== null)
{
  let a=authToken.split(',');
  id=a[0];
}
	function getWishs1() {
  axios.get('http://localhost/php/API/?key=wishsp&id='+id).then(function(response) {
      console.log(response.data);
      setWishs1(response.data);
  });
}
  const { cartList } = useSelector((state) => state.cart);
  //alert(cartList.length);
  
  const dispatch = useDispatch();
  // middlware to localStorage
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  const handelAdd2 = (i,p,c,q,pr,t,fo) => {
    axios.post('http://localhost/php/API/?key=wishlistc&id='+i+'&c='+c+'&p='+p+'&q='+q+'&pri='+pr+'&ty='+t+'&fo='+fo).then(function(response){
     window.location.href = '/wishlist';
   
    
});
  }
  const handelAdd = () => {
   
    toast.success("Buy Successfully");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);
  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {wishs1.length === 0 && (
              <h1 className="no-items product">No Items are add in Wishlist</h1>
            )}
            {wishs1 && wishs1.map((item) => {
              const productQty = item.price * item.qty;
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
                           
                            <span>Rs. {item.price}.00</span>
                          </h4>
                        </Col>
						<button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd2(item.wishlist_id,item.product_id,id,1,item.price,'a',item.size_colors)}
            >
              Add To Cart
            </button>
                                              </Row>

                    </Col>
                    <button
                      className="delete"
                       onClick={() => handelAdd2(item.wishlist_id,item.product_id,id,1,item.price,'d',item.size_colors)}
                    >
                    X
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          
        </Row>
      </Container>
    </section>
  );
};

export default Wishlist;
