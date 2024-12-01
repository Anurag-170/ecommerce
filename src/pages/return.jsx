import { useEffect,useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import { Col, Container, Row } from "react-bootstrap";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

import axios from "axios";
import { toast } from "react-toastify";



const Profile = () => {
	const [wishs1, setWishs1] = useState([]);
  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
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
  axios.get('http://localhost/php/API/?key=orders_return&cid='+id).then(function(response) {
      console.log(response.data);
      
      setWishs1(response.data);
  });
}
const handelcancel = (i) => {
    axios.post('http://localhost/php/API/?key=returnorder&id='+i).then(function(response){
      toast.success("Return successfully & refund will be initiated in next 24 hours");
      const timer = setTimeout(() => {
        window.location.href = '/return';
      }, 2000);
    
    
});
  }
    return (
      
      <section className="cart-items">
      <Container>
	  <h1>Return Order</h1>
        <Row className="justify-content-center">
          <Col md={8}>
            {wishs1.length === 0 && (
              <h1 className="no-items product">No Items are add in Wishlist</h1>
            )}
            {wishs1.map((item) => {
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
                          <h3>{item.productName}<span style={{color:"red"}}>({item.order_status})</span></h3>
                          <h4>
                           
                            <span>Rs. {item.price}.00</span>
                          </h4>
                        </Col>
						
                                              </Row>

                    </Col>
					<button
                      className="delete"
                    style={{backgroundColor:"green",color:"white"}}   
					onClick={() => handelcancel(item.order_id)}		
                    >
                    Return
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
  }

export default Profile;
